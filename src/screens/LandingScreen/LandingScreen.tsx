import "./LandingScreen.css";
import { Button, buttonVariants } from "@/components/ui/button";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";
import NavyLogo from "../../assets/logos/navy.png";
import { HashLink } from "react-router-hash-link";
import { cn } from "@/lib/utils";
import { SiteMap } from "@/types";
import LearnMore from "./sections/LearnMore";

const LandingScreen = () => {
  return (
    <div className="flex flex-col w-full items-center justify-start px-[100px] max-w-[1400px] m-auto">
      <div className="header px-24 pb-24 pt-[3rem] flex flex-col items-center justify-center gap-10 max-w-[1000px]">
        <div className="flex flex-col gap-6 max-w-[865px] justify-center items-center">
          <div className="flex flex-nowrap mt-[64px]">
            <TypographyH1 className="text-center font-semibold text-[75px] leading-[4rem] whitespace-nowrap">
              reimag
            </TypographyH1>
            <img
              src={NavyLogo}
              className="w-[72px] h-[72px] translate-y-[-7px] ml-[-4px] mr-[-8px] rotate-[-16deg]"
            />
            <TypographyH1 className="text-center font-semibold text-[75px] leading-[4rem] whitespace-nowrap">
              ne learning.
            </TypographyH1>
          </div>
          <TypographyH3 className="text-center font-poppins text-[22px] opacity-40 px-[100px]">
            Supercharge your learning with personalized animations for any idea.
          </TypographyH3>
        </div>
        <div className="flex flex-row gap-4 items-center justify-center">
          <HashLink
            to={SiteMap.LandingScreen.children.LearnMore.slug}
            smooth
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            {/* <Lightbulb className="mr-2" size={16} /> */}
            Learn more
          </HashLink>
          {/* </Button> */}
          <Button
            className="icon-button"
            // onClick={() => navigate(SiteMap.TransferScreen.slug)}
          >
            Try Imaginit free
            <div className="relative w-[18px] h-[18px]">
              <ArrowRight className="icon-button-icon" size={18} />
            </div>
          </Button>
        </div>
      </div>
      <LearnMore />
    </div>
  );
};

export default LandingScreen;
