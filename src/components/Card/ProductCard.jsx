import React from "react";
import { SmoothCorners } from "react-smooth-corners";
import Typography from "../Typography/Typography";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ id, name, short, slug, imgUrl }) {
  const navigate = useNavigate();
  function handleNavigation() {
    navigate(`/products/${slug}`);
  }
  return (
    <div>
      <SmoothCorners
        corners="6, 6"
        borderRadius="12px"
        as="button"
        onClick={handleNavigation}
        className="w-[300px] h-[300px] hover:w-[320px] hover:h-[320px] flex justify-center items-center overflow-hidden relative transition-all"
      >
        <img
          src={imgUrl}
          alt={name}
          className="w-[300px] hover:w-[320px] transition-all"
        />
        <Typography variant="title" className="absolute bottom-10">
          {name}
        </Typography>
        <Typography variant="caption" className="absolute bottom-3 w-[80%]">
          {short}
        </Typography>
      </SmoothCorners>
    </div>
  );
}
