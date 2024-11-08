import "./LandingScreen.css";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import { ArrowRight, Calendar } from "lucide-react";
import NavyLogo from "../../assets/logos/navy.png";
import { SiteScreens } from "@/types";
import LearnMore from "./components/LearnMore";
import { useNavigate } from "react-router-dom";
import { JoinWaitlist } from "./components/JoinWaitlist";

const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-screen flex flex-col w-full items-center justify-start px-[100px] max-w-[1400px] m-auto mt-[var(--navbar-height)]">
      <div className="landing__top pb-24 pt-[3rem] flex flex-col items-center justify-center gap-10 max-w-[1000px]">
        <div className="landing__header-container flex flex-col gap-6 max-w-[865px] justify-center items-center">
          <div className="landing__header flex justify-center mt-[64px]">
            <span className="flex flex-nowrap">
              <TypographyH1 className="text-center font-semibold text-[75px] leading-[4rem]">
                {"reimag"}
              </TypographyH1>
              <img
                src={NavyLogo}
                className="w-[72px] h-[72px] translate-y-[-8px] ml-[-4px] mr-[-8px] rotate-[-16deg]"
              />
              <TypographyH1 className="text-center font-semibold text-[75px] leading-[4rem]">
                {"ne "}
              </TypographyH1>
            </span>
            <div className="landing__header-space min-w-[24px]">&nbsp;</div>
            <TypographyH1 className="text-center font-semibold text-[75px] leading-[4rem]">
              {"learning."}
            </TypographyH1>
          </div>
          <TypographyH3 className="landing__subheading text-center font-poppins text-[22px] opacity-40 px-[100px]">
            Learn visually with personalized, engaging animations for every
            idea.
          </TypographyH3>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Button
            className="icon-button text-[12px] mr-4 px-3 h-[36px] sm:h-9 sm:px-3 sm:text-sm sm:mr-8"
            variant={"outline"}
            onClick={() => navigate(SiteScreens.SCHEDULE_DEMO)}
          >
            <Calendar className="mr-2 mb-[1.5px]" size={16} />
            Schedule Demo
          </Button>
          {/* </Button> */}
          <Button
            className="icon-button text-[12px] px-3 h-[36px] sm:h-9 sm:px-3 sm:text-sm sm:mr-8"
            onClick={() => navigate(SiteScreens.AUTH)}
          >
            Join Waitlist
            <div className="relative w-[18px] h-[18px]">
              <ArrowRight className="icon-button-icon" size={18} />
            </div>
          </Button>
        </div>
      </div>
      <LearnMore />
      <JoinWaitlist />
    </div>
  );
};

export default LandingScreen;
