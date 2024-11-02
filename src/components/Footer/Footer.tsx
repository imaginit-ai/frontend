import { Separator } from "../ui/separator";
import { TypographyH3 } from "../ui/typography";
import logo from "../../assets/logos/navy.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer p-10">
      <Separator orientation="horizontal" />
      <div className="footer-content pt-10 pb-10">
        <a className="flex items-center" href="/">
          <img className="w-[24px] h-[24px] mb-[5px]" src={logo} />
          <TypographyH3 className="ml-[10px] text-foreground font-semibold">
            imaginit
          </TypographyH3>
        </a>
      </div>
    </div>
  );
};

export default Footer;
