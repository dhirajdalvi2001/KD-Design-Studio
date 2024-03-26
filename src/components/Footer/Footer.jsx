import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-without-text.png";
import Typography from "../Typography/Typography";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="h-16 w-full px-20 bg-foreground-100 border-t-1 flex justify-between items-center">
      <div className="flex justify-center gap-4 w-36 text-foreground-500">
        <a
          href="https://www.facebook.com/profile.php?id=61557391481554"
          target="_blank"
        >
          <FaFacebook size={26} className="cursor-pointer" />
        </a>
        <a href="https://www.instagram.com/kd.design.studio_/">
          <RiInstagramFill
            size={26}
            className="cursor-pointer"
            href="https://www.facebook.com/profile.php?id=61557391481554"
          />
        </a>
      </div>
      <div
        onClick={() => navigate("/")}
        className="font-bold text-inherit h-14 overflow-hidden cursor-pointer"
      >
        <img src={logo} alt="KD-Design-Studio" className="w-[100px]" />
      </div>
      <Typography
        variant="a"
        className="cursor-pointer w-36"
        href="mailto:kunal@kd-studio.in"
      >
        kunal@kd-studio.in
      </Typography>
    </div>
  );
}
