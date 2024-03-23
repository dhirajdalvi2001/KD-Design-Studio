import React from "react";
import ProductCard from "../../components/Card/ProductCard";
import { products } from "../../utils/data";
import BodyLayout from "../../components/Layout/BodyLayout";

const Products = () => {
  return (
    <BodyLayout>
      <div className="pt-10 mx-auto w-full h-full flex justify-center">
        <div className="w-[80%]">
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                short={product.short}
                imgUrl={product.imgUrls[0]}
              />
            );
          })}
        </div>
      </div>
    </BodyLayout>
  );
};

export default Products;
