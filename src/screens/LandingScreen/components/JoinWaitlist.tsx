import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import "./JoinWaitlist.css";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SiteScreens } from "@/types";

export const JoinWaitlist = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-jw w-full flex flex-col pb-24">
      <TypographyH2 className="landing-jw__title text-center font-semibold text-3xl leading-[3.2rem] mb-6">
        supercharge your learning.
      </TypographyH2>
      <TypographyH3 className="landing__subheading text-center font-poppins text-[20px] opacity-40 px-[100px]">
        Join the waitlist for early access or generate up to 3 experimental
        videos now for free.
      </TypographyH3>
      <div className="mt-8 w-full flex justify-center items-center">
        <Button
          className="icon-button text-[12px] mr-4 px-3 h-[36px] sm:h-9 sm:px-3 sm:text-sm sm:mr-8"
          variant={"outline"}
          onClick={() => navigate(SiteScreens.SCHEDULE_DEMO)}
        >
          <Calendar className="mr-2 mb-[1.5px]" size={16} />
          Schedule Demo
        </Button>
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
  );
};
