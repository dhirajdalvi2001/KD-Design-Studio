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
        <div className="pb-7 md:py-14 min-w-[50%] max-md:top-24 max-md:bg-white">
          <div className="md:fixed md:top-[20vh] md:left-14 m-auto h-fit md:h-[70vh] w-[90%] px-2 md:px-4 md:w-[45vw] flex flex-col gap-4 md:overflow-y-scroll">
            <div className="sticky top-24 pt-[28px] pb-4 md:top-0 bg-white md:bg-foreground-50">
              <div className="">
                <Breadcrumbs options={breadcrumbOptions} />
              </div>
              {/* Product Details */}
              <div className="flex flex-col gap-2 text-justify">
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
            <div className="flex flex-col gap-2 text-justify">
              {product?.details?.map((detail) => {
                if (detail?.listItems) {
                  return (
                    <div key={detail.id}>
                      <Typography variant="p">
                        <span className="font-medium">{detail?.title}</span>
                      </Typography>
                      <ol className="pl-4 list-decimal">
                        {detail?.listItems?.map((list, index) => {
                          return (
                            <li key={"list" + index}>
                              <Typography variant="caption">
                                {list?.caption?.map((caption, index) => {
                                  return <p key={index}>{caption}</p>;
                                })}
                              </Typography>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  );
                } else {
                  return (
                    <div key={detail.id}>
                      <Typography variant="p">
                        <span className="font-medium">{detail?.title}</span>
                      </Typography>
                      <Typography variant="caption">
                        {detail?.caption?.map((caption, index) => {
                          return <p key={"caption" + index}>{caption}</p>;
                        })}
                      </Typography>
                    </div>
                  );
                }
              })}
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
                className="w-4/5"
              />
            );
          })}
        </div>
      </div>
    </BodyLayout>
  );
}
