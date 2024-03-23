import { useParams } from "react-router-dom";
import BodyLayout from "../../components/Layout/BodyLayout";
import { products } from "../../utils/data";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Typography from "../../components/Typography/Typography";

export default function SingleProduct() {
  const { slug } = useParams();
  const product = products.find((pro) => (pro.slug = slug));
  const breadcrumbOptions = [
    {
      label: "Products",
      value: "/products",
      allowClick: true,
    },
    {
      label: product.name,
      value: `/products/${slug}`,
      allowClick: false,
    },
  ];
  return (
    <BodyLayout>
      <div className="w-full h-full flex flex-col md:flex-row gap-4">
        <div className="py-7 md:py-14 min-w-[40%] max-md:sticky max-md:top-24 max-md:bg-white">
          <div className="md:fixed md:top-[20vh] md:left-14 m-auto h-fit md:h-[70vh] w-full px-4 md:w-[30vw] flex flex-col gap-4">
            <div className="">
              <Breadcrumbs options={breadcrumbOptions} />
            </div>
            {/* Product Details */}
            <div className="flex flex-col gap-2">
              <>
                <Typography variant="title">{product.name}</Typography>
                <Typography variant="caption">{product.short}</Typography>
              </>
              <>
                <Typography variant="caption">
                  Year: <span className="font-medium">{product.year}</span>
                </Typography>
                <Typography variant="caption">
                  Materials:{" "}
                  <span className="font-medium">
                    {product.materials.join(", ")}
                  </span>
                </Typography>
              </>
            </div>
          </div>
        </div>
        <div className="pb-14 md:py-14 flex flex-col items-center gap-14">
          {product.imgUrls.map((image, index) => {
            return (
              <img
                key={image}
                src={image}
                alt={slug + index}
                className="w-3/5"
              />
            );
          })}
        </div>
      </div>
    </BodyLayout>
  );
}
