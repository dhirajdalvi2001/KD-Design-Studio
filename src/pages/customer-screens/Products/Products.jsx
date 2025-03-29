import ProductCard from "../../../components/Card/ProductCard";
import { products } from "../../../utils/data";
import BodyLayout from "../../../components/Layout/BodyLayout";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../api/useAxios";

const Products = () => {
  const { axiosInstance } = useAxios();

  // All Products
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["getAllProductsList"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products/list/");
      return response?.data?.data;
    },
    refetchOnMount: true,
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <BodyLayout>
      <div className="pt-10 mx-auto w-full h-full flex justify-center">
        <div className="w-[90%] xl:w-[80%] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {/* Hiding products without any image */}
          {productsData
            ?.filter((pro) => pro?.src !== null)
            ?.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex justify-center items-center h-[350px] md:h-[400px]"
                >
                  <ProductCard
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    imgUrl={product.src}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </BodyLayout>
  );
};

export default Products;
