import "./LandingScreen.css";
import { Button } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
} from "@/components/ui/typography";
import { ArrowRight, Calendar } from "lucide-react";
import NavyLogo from "../../assets/logos/navy.png";
import { SiteMap } from "@/types";
import LearnMore from "./sections/LearnMore";
import { useNavigate } from "react-router-dom";

const LandingScreen = () => {
  const navigate = useNavigate();

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
            Learn visually with personalized, engaging animations for every
            idea.
          </TypographyH3>
        </div>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Button
            className="icon-button"
            variant={"outline"}
            onClick={() => navigate(SiteMap.ScheduleDemoScreen.slug)}
          >
            <Calendar className="mr-2" size={16} />
            Schedule Demo
          </Button>
          {/* </Button> */}
          <Button
            className="icon-button"
            onClick={() => navigate(SiteMap.GenerateScreen.slug)}
          >
            Try Imaginit free
            <div className="relative w-[18px] h-[18px]">
              <ArrowRight className="icon-button-icon" size={18} />
            </div>
          </Button>
        </div>
      </div>
      <LearnMore />
      <div className="w-full flex flex-col gap-[32px] pb-24">
        <TypographyH2 className="text-center font-semibold text-5xl leading-[4rem] whitespace-nowrap">
          supercharge your learning.
        </TypographyH2>
      </div>
    </div>
  );
};

export default LandingScreen;
