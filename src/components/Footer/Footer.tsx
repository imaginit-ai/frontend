import { TypographyH3 } from "../ui/typography";
import logo from "../../assets/logos/navy.png";
import { Separator } from "../ui/separator";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="max-h-footer-height px-[100px] w-full max-w-[1400px] m-auto">
      <Separator orientation="horizontal" />
      <div className="footer-content h-full w-full pt-10 pb-10">
        <a className="flex items-center" href="/">
          <img className="w-[24px] h-[24px] mb-[5px]" src={logo} />
          <TypographyH3 className="ml-[10px] text-foreground font-semibold">
            imaginit
          </TypographyH3>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
