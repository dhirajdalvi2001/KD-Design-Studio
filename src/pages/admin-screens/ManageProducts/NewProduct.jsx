import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../../api/useAxios";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import onError from "../../../utils/onError";
import {
  initialValue,
  productSchema,
} from "../../../utils/validations/product-validation";
import AdminBodyLayout from "../../../components/Layout/AdminBodyLayout";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { productTypes } from "../../../utils/constants";
import Typography from "../../../components/Typography/Typography";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import Upload from "../../../components/Upload/Upload";

export default function NewProduct() {
  const { productId } = useParams();
  const { axiosInstance } = useAxios();
  const navigate = useNavigate();
  const [assets, setAssets] = useState({});
  const [file, setFile] = useState(null);
  const [qrcode, setQrCode] = useState(null);
  const {
    setValue,
    setError,
    watch,
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(productSchema),
  });
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "key_features",
  });

  // Product Details
  const { data: productDetails, isLoading: productDetailsLoading } = useQuery({
    queryKey: ["productDetails"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/${productId}/`);
      return response.data;
    },
    enabled: !!productId,
    refetchOnMount: true,
  });

  // Create Product
  const { mutate: createProduct, isLoading: createProductLoading } =
    useMutation({
      mutationFn: async (data) => {
        const response = await axiosInstance.post("/products/", data);
        return response.data;
      },
      onSuccess: () => {
        navigate("/admin/manage-products");
      },
      onError: (error) => {
        onError(error, setError);
      },
    });

  // Update Product
  const { mutate: updateProduct, isLoading: updateProductLoading } =
    useMutation({
      mutationFn: async (data) => {
        const response = await axiosInstance.put(
          `/products/${productId}/`,
          data
        );
        return response.data;
      },
      onSuccess: () => {
        navigate("/admin/manage-products");
      },
      onError: (error) => {
        onError(error, setError);
      },
    });

  // Generate QR
  const { mutate: uploadFile, isLoading: qrGenerating } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(`/assets/upload/`, data);
      if (!response.data.url) return;

      const formData = new FormData();
      Object.entries(response.data.fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      const s3Response = await axios.post(response.data.url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (s3Response) {
        const prevAssets = { ...assets };
        const currentLength = Object.keys(prevAssets)?.length;
        const newIndex = currentLength + 1;

        const fileUrl =
          import.meta.env.VITE_APP_BUCKET_URL + response.data.fields.key;
        const formattedUrl = fileUrl?.replace(/ /g, "+");

        setAssets({
          ...prevAssets,
          [newIndex]: formattedUrl,
        });

        setFile(null);
      }

      return response.data;
    },
    onError: (error) => {
      onError(error, setError);
    },
  });

  useEffect(() => {
    if (productDetails) {
      reset({
        name: productDetails.data.name,
        year: productDetails.data.year,
        slug: productDetails.data.slug,
        type: productDetails.data.type,
        introduction: productDetails.data.introduction,
        concept_overview: productDetails.data.concept_overview,
      });
      setAssets(productDetails.data.assets);
      setQrCode(productDetails.data.qrcode);

      // Clear existing fields first
      fields.forEach((_, index) => remove(index));

      // Append key features one by one
      productDetails.data.key_features.forEach((feature) => {
        append({ value: feature }); // Assuming key_features is an array of strings
      });
    }
    if (!productId) {
      reset({ ...initialValue });
      setAssets({});
      setQrCode(null);
    }
  }, [productId, productDetails, setValue, reset]);

  function handleUpload(event) {
    const files = Array.from(event.target.files);
    const singleFile = files?.[0];

    if (singleFile) {
      setFile(singleFile);
      const payload = {
        file_name: singleFile?.name,
        file_type: singleFile?.type,
      };
      uploadFile(payload);
    }
  }

  function handleDelete(index) {
    const updatedAssets = Object.fromEntries(
      Object.entries(assets).filter(([key]) => {
        const updatedIndex = Number(key) - 1;
        return updatedIndex !== index;
      })
    );

    setAssets(updatedAssets);
  }

  function onSubmit(data) {
    const emptyKeyFeatures =
      data?.key_features?.length === 1 && data?.key_features?.[0]?.value === "";

    let payload = {
      ...data,
      assets: assets,
      key_features: emptyKeyFeatures
        ? []
        : data?.key_features?.map((feature) => feature.value),
    };
    const conceptExists =
      data?.concept_overview?.trim() && data?.concept_overview?.trim() !== "";
    if (!conceptExists) delete payload.concept_overview;
    if (productId) {
      updateProduct(payload);
    } else {
      createProduct(payload);
    }
  }

  const fieldsDisabled = productDetailsLoading;
  const buttonDisabled = createProductLoading || updateProductLoading;

  console.log(watch('type'), 'type DD');
  

  return (
    <AdminBodyLayout isFormPage buttonDisabled={buttonDisabled}>
      <div className="w-full flex items-start gap-5">
        <form
          className="sticky top-[15.5px] grid grid-cols-2 gap-3 w-full md:min-w-[550px] md:w-[550px] text-foreground-900"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="title" className="col-span-2">
            {productId ? "Edit" : "New"} Product
          </Typography>
          <Input
            label="Product Name"
            placeholder="Enter Product Name"
            size="md"
            labelPlacement="outside"
            variant="bordered"
            isDisabled={fieldsDisabled}
            value={watch("name")}
            errorMessage={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Year"
            placeholder="Enter Year"
            size="md"
            labelPlacement="outside"
            variant="bordered"
            isDisabled={fieldsDisabled}
            value={watch("year")}
            errorMessage={errors.year?.message}
            {...register("year")}
          />
          <Input
            label="Slug"
            placeholder="simpliseat"
            size="md"
            labelPlacement="outside"
            variant="bordered"
            isDisabled={fieldsDisabled}
            value={watch("slug")}
            errorMessage={errors.slug?.message}
            {...register("slug")}
          />
          <Select
            label="Type"
            placeholder="Select category"
            size="md"
            labelPlacement="outside"
            variant="bordered"
            isDisabled={fieldsDisabled}
            value={watch("type")}
            items={productTypes}
            errorMessage={errors.type?.message}
            {...register("type")}
          >
            {productTypes.map((product) => (
              <SelectItem key={product.value}>{product.label}</SelectItem>
            ))}
          </Select>
          <div className="col-span-2">
            <Textarea
              label="Introduction"
              placeholder="Enter introduction"
              size="md"
              labelPlacement="outside"
              variant="bordered"
              isDisabled={fieldsDisabled}
              value={watch("introduction")}
              minRows={5}
              maxRows={20}
              errorMessage={errors.introduction?.message}
              {...register("introduction")}
            />
          </div>
          <div className="col-span-2">
            <Textarea
              label="Concept Overview"
              placeholder="Enter Concept Overview"
              size="md"
              labelPlacement="outside"
              variant="bordered"
              isDisabled={fieldsDisabled}
              value={watch("concept_overview")}
              minRows={5}
              maxRows={20}
              errorMessage={errors.concept_overview?.message}
              {...register("concept_overview")}
            />
          </div>
          <Upload handleUpload={handleUpload} className="col-span-2" />
          <div className="col-span-2 flex flex-col gap-2">
            <Typography variant="p">Key Features</Typography>
            <div className="flex flex-col gap-3">
              {fields?.map((field, index) => {
                return (
                  <div
                    key={field?.id}
                    className="flex justify-between items-start gap-2"
                  >
                    <Textarea
                      placeholder="Enter Feature"
                      size="md"
                      minRows={2}
                      labelPlacement="outside"
                      variant="bordered"
                      isDisabled={fieldsDisabled}
                      value={watch(`key_features.${index}.value`)}
                      errorMessage={errors.key_features?.message?.[index]}
                      {...register(`key_features.${index}.value`)}
                    />
                    <Button
                      size="sm"
                      variant="faded"
                      onClick={() => index !== 0 && remove(index)}
                    >
                      <BsTrash />
                    </Button>
                  </div>
                );
              })}
              <Button
                size="sm"
                variant="faded"
                className="w-fit"
                onClick={() => append({ value: "" })}
              >
                Add Feature
              </Button>
            </div>
          </div>

          <div className="w-full h-[60px] flex items-center justify-start gap-3">
            <Button size="sm" variant="faded" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="solid"
              type="submit"
              isDisabled={buttonDisabled}
              className="bg-primary-500 text-white"
            >
              {productId ? "Edit" : "Save"}
            </Button>
          </div>
        </form>

        <div className="w-full flex flex-col items-center gap-5 p-2 bg-black/10">
          {qrcode && (
            <div className="flex flex-col gap-1">
              <Typography variant="p">Product QR Code</Typography>
              <img src={qrcode} width={350} height={350} />
            </div>
          )}
          {Object.entries(assets)?.map(([key, value], index) => {
            const videoExtensions = [".mp4"];
            const isVideoFile = value?.endsWith(videoExtensions);

            return (
              <div key={key} className="relative w-fit h-fit">
                {!isVideoFile && (
                  <img
                    key={key + "image"}
                    src={value}
                    width={500}
                    height={500}
                  />
                )}
                {isVideoFile && (
                  <video
                    key={key + "video"}
                    src={value}
                    autoPlay={true}
                    loop={true}
                    width={500}
                    height={500}
                  />
                )}
                <Button
                  onClick={() => handleDelete(index)}
                  className="!p-0 absolute right-2 top-2 !min-w-fit !min-h-fit !h-fit rounded-md shadow-[0_0_4px] shadow-white"
                >
                  <BsTrash className="h-8 w-8 p-2 bg-black" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </AdminBodyLayout>
  );
}
