import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-without-text.png";
import Typography from "../Typography/Typography";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { socials } from "../../utils/data";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="h-full md:h-full w-full px-4 md:px-20 bg-foreground-100 border-t-1 flex justify-between items-center">
      <div className="flex justify-start gap-4 w-32 md:w-36 text-foreground-500">
        <a href={socials.facebook} target="_blank">
          <FaFacebook size={22} className="cursor-pointer" />
        </a>
        <a href={socials.instagram} target="_blank">
          <RiInstagramFill size={22} className="cursor-pointer" />
        </a>
      </div>
      <div
        onClick={() => navigate("/")}
        className="font-bold text-inherit h-14 overflow-hidden cursor-pointer flex items-center"
      >
        <img
          src={logo}
          alt="KD-Design-Studio"
          className="w-[60px] md:w-[60px]"
        />
      </div>
      <Typography
        variant="a"
        className="cursor-pointer w-32 md:w-36 !text-[11px] text-right font-normal"
        href="mailto:kunal@kd-studio.in"
      >
        kunal@kd-studio.in
      </Typography>
    </div>
  );
}
