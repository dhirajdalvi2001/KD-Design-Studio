import ProductCard from "../../components/Card/ProductCard";
import { products } from "../../utils/data";
import BodyLayout from "../../components/Layout/BodyLayout";

const Products = () => {
  return (
    <BodyLayout>
      <div className="pt-10 mx-auto w-full h-full flex justify-center">
        <div className="w-[90%] xl:w-[80%] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex justify-center items-center h-[350px] md:h-[400px]"
              >
                <ProductCard
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  short={product.short}
                  imgUrl={product.thumbnail}
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
