import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "../../../components/Table/Table";
import { useAxios } from "../../../api/useAxios";
import AdminBodyLayout from "../../../components/Layout/AdminBodyLayout";
import { Link } from "react-router-dom";
import ProductActions from "./ProductActions";

export default function ManageProducts() {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const productsTableHeaders = [
    { label: "Sr. No.", className: "min-w-[100px]" },
    { label: "Product Name", className: "w-full" },
    { label: "Year", className: "min-w-[100px]" },
    { label: "Slug", className: "min-w-[100px]" },
    { label: "Type", className: "min-w-[150px]" },
    { label: "Likes", className: "min-w-[100px]" },
    { label: "Actions", className: "min-w-[60px]" },
  ];

  // All Products
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products/");
      return response.data;
    },
    refetchOnMount: true,
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  // Delete Product
  const { mutate: deleteProduct, isLoading: deleteProductLoading } =
    useMutation({
      mutationFn: async (productId) => {
        const response = await axiosInstance.delete(`/products/${productId}/`);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      },
    });

  const productsTableBody = productsData?.data?.map((product, index) => [
    index + 1,
    product.name,
    product.year,
    <Link
      to={`${import.meta.env.VITE_APP_DOMAIN}/products/${product.slug}`}
      target="_blank"
      className="text-blue-600 underline"
    >
      {product.slug}
    </Link>,
    product.type,
    product.likes?.length || 0 + " Likes",
    <ProductActions
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      deleteProductLoading={deleteProductLoading}
    />,
  ]);

  return (
    <AdminBodyLayout
      title="Products"
      addNewButton="Add New Product"
      addNewHRef="/admin/manage-products/new"
    >
      <Table
        headers={productsTableHeaders}
        body={productsTableBody}
        isLoading={isLoading}
        isListPage
      />
    </AdminBodyLayout>
  );
}
