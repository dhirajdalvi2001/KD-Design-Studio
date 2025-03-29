import { Link, useParams } from "react-router-dom";
import BodyLayout from "../../../components/Layout/BodyLayout";
import { products } from "../../../utils/data";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import Typography from "../../../components/Typography/Typography";
import { useAxios } from "../../../api/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { videoExtensions } from "../../../utils/constants";
import { toTitleCase } from "../../../utils/helper-functions";
import { FaThumbsUp } from "react-icons/fa";
import { Button, Tooltip } from "@nextui-org/react";
import classNames from "classnames";

export default function SingleProduct() {
  const { slug } = useParams();
  const { axiosInstance, isAuthenticated } = useAxios();
  const queryClient = useQueryClient();

  // const product = products.find((pro) => pro.slug === slug);

  // Product Details
  const { data: product, isLoading } = useQuery({
    queryKey: ["getSinglePoduct"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/${slug}/details/`);
      return response?.data?.data;
    },
    refetchOnMount: true,
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  const { mutate: likeDislikeProduct } = useMutation({
    mutationKey: "likeDislikeProduct",
    mutationFn: async (payload) => {
      const response = await axiosInstance.patch(`/products/like/`, payload);
      return response?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getSinglePoduct");
    },
  });

  const breadcrumbOptions = [
    {
      label: "Products",
      value: "/products",
      allowClick: true,
    },
    {
      label: product?.name,
      value: `/products/${slug}`,
      allowClick: false,
    },
  ];

  return (
    <BodyLayout>
      <div className="w-full h-full flex flex-col md:flex-row max-md:gap-4">
        <div className="pb-7 md:py-14 min-w-[55%] max-md:top-24 ">
          <div className="md:fixed md:top-36 md:left-8 lg:left-14 m-auto h-fit md:h-[70vh] w-[90%] px-2 md:px-0 md:w-[50vw] flex flex-col">
            <div className="sticky top-16 max-md:pt-[12px] pb-4 md:top-0 bg-foreground-50 md:bg-foreground-50">
              <div className="mb-4">
                <Breadcrumbs options={breadcrumbOptions} />
              </div>
              {/* Product Details */}
              <div className="flex flex-col gap-2 text-justify">
                <div className="flex justify-between items-center gap-4 relative">
                  <Typography variant="title">{product?.name}</Typography>
                  {!isAuthenticated && (
                    <Typography
                      variant="caption"
                      className="absolute -top-6 right-0 bg-foreground-300 px-2 py-0.5 text-[11px]"
                    >
                      To drop a like, Please login{" "}
                      <Link to="/auth/login" className="text-blue-700">
                        here
                      </Link>
                    </Typography>
                  )}
                  <div className="flex items-center gap-1">
                    <Button
                      className="!p-0 !min-w-14 !w-14 !h-8"
                      onClick={() => {
                        if (!isAuthenticated) return;
                        likeDislikeProduct({ id: product?.id });
                      }}
                      disabled={!isAuthenticated}
                    >
                      <Typography
                        variant="p"
                        className="text-right text-[13px]"
                      >
                        {product?.likes}
                      </Typography>
                      <FaThumbsUp
                        className={classNames(
                          product?.is_liked
                            ? "text-blue-600"
                            : "text-foreground-900"
                        )}
                      />
                    </Button>
                  </div>
                </div>
                <>
                  <Typography variant="caption">
                    Year: <span className="font-medium">{product?.year}</span>
                  </Typography>
                  <Typography variant="caption" className="italic">
                    Prototype
                  </Typography>
                </>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-justify">
              {["introduction", "concept_overview"]?.map((key) => {
                if (product?.[key] === null || product?.[key] === "")
                  return null;
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <Typography variant="p">
                      <span className="font-medium">
                        {key ? toTitleCase(key) : ""}
                      </span>
                    </Typography>
                    <Typography variant="caption">{product?.[key]}</Typography>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pb-14 md:py-14 flex flex-col items-center gap-14">
          {product?.assets
            ? Object.entries(product?.assets)?.map(([key, value], index) => {
                const isVideoFile = value?.endsWith(videoExtensions);

                return (
                  <>
                    {isVideoFile && (
                      <video
                        key={value + "video"}
                        src={value}
                        alt={slug + "_video_" + index}
                        className="w-[90%]"
                        autoPlay="autoplay"
                        loop
                        muted
                      />
                    )}
                    {!isVideoFile && (
                      <img
                        key={value + "image"}
                        src={value}
                        alt={slug + "_image_" + index}
                        className="w-[90%]"
                      />
                    )}
                  </>
                );
              })
            : null}
        </div>
      </div>
    </BodyLayout>
  );
}
