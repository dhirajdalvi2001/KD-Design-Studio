import Typography from "../Typography/Typography";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ id, name, short, slug, imgUrl }) {
  const navigate = useNavigate();
  function handleNavigation() {
    navigate(`/products/${slug}`);
  }
  return (
    <div
      onClick={handleNavigation}
      className="flex flex-col justify-center items-center group transition relative"
    >
      <div className="w-[280px] md:w-[320px] h-[280px] md:h-[320px] flex justify-center items-center cursor-pointer overflow-hidden relative transition-all z-10 bg-foreground-50">
        <img
          src={imgUrl}
          alt={name}
          className="w-[240px] md:w-[280px] md:group-hover:w-[300px] transition-all"
        />
      </div>
      <Typography
        variant="subtitle"
        className="absolute -bottom-8 md:-bottom-2 md:group-hover:-bottom-8 md:opacity-0 md:group-hover:opacity-100 md:delay-100 transition-all font-normal"
      >
        {name}
      </Typography>
      {/* <Typography variant="caption">{short}</Typography> */}
    </div>
  );
}
