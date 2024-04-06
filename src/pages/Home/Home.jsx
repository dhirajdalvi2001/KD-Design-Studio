import BodyLayout from "../../components/Layout/BodyLayout";
import Carousel from "react-bootstrap/Carousel";
import { carousalProducts, products } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import Typography from "../../components/Typography/Typography";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Home = () => {
  const navigate = useNavigate();

  const CustomPrevArrow = ({ onClick }) => (
    <BsChevronLeft
      onClick={onClick}
      className="arrow text-foreground-600 hidden md:block"
    />
  );

  const CustomNextArrow = ({ onClick }) => (
    <BsChevronRight
      onClick={onClick}
      className="arrow text-foreground-600 hidden md:block"
    />
  );

  return (
    <BodyLayout className="relative max-h-screen overflow-hidden">
      <Carousel
        className="!text-foreground-500 !h-full"
        indicators={false}
        interval={2000}
        controls={true}
        prevIcon={<CustomPrevArrow />}
        nextIcon={<CustomNextArrow />}
        fade
        touch
      >
        {carousalProducts?.map((product) => {
          return (
            <Carousel.Item
              key={product?.id}
              className="h-[90vh] !flex !justify-center !items-center"
            >
              <div
                className="w-[96vw] sm:w-[90vw] h-[90vw] md:h-[40vw] md:w-[40vw] flex justify-center items-center overflow-hidden cursor-pointer"
                onClick={() => navigate(`/products/${products[0].slug}`)}
              >
                <LazyLoadImage
                  src={product?.src}
                  alt={product?.name}
                  className="w-full"
                />
              </div>
              <Carousel.Caption className="text-foreground-800 p-0 sm:hidden -z-10">
                <div className="flex justify-between">
                  <Typography
                    variant="caption"
                    className="text-[9px] sm:text-[11px] flex items-center w-fit"
                  >
                    {product?.name}
                  </Typography>
                  <Typography
                    variant="a"
                    className="text-[9px] sm:text-[11px] font-normal"
                    href="/products"
                  >
                    View all
                  </Typography>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </BodyLayout>
  );
};

export default Home;
