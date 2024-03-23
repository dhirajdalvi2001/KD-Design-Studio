import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.svg";
import Typography from "../Typography/Typography";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="h-52 w-full bg-foreground-100 border-t-1 flex justify-center">
      <div className="lg:w-[80%]">
        <div
          onClick={() => navigate("/")}
          className="font-bold text-inherit h-24 overflow-hidden cursor-pointer"
        >
          <img src={logo} alt="KD-Design-Studio" className="w-[140px] -mt-14" />
        </div>
        <Typography variant="caption">Address comes here</Typography>
      </div>
    </div>
  );
}
