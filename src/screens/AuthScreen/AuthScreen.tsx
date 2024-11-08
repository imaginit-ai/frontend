import { TypographyH2 } from "@/components/ui/typography";
import "./AuthScreen.css";
import logo from "../../assets/logos/navy.png";
import { WaitlistForm } from "./components/WaitlistForm";
// import WatchingVideosImg from "../../assets/illustrations/watching-videos.svg?react";
import GenerateScreenMockup from "../../assets/generate-screen-mockup.png";

const AuthScreen = () => {
  return (
    <div className="auth-screen min-h-full w-full flex flex-row bg-background">
      <div className="as__left flex min-w-[600px] w-full min-h-full flex-col px-[75px] pt-[50px] pb-[18px] glass gap-10 sm:gap-16">
        <a
          className="flex items-center justify-center sm:justify-start mb-[-8px] sm:mb-0"
          href="/"
        >
          <img
            className="w-[20px] h-[20px] mb-[4px] sm:w-[30px] sm:h-[30px] sm:mb-[5px]"
            src={logo}
          />
          <TypographyH2 className="text-xl ml-[4px] sm:text-3xl sm:ml-[8px] text-foreground font-semibold">
            imaginit
          </TypographyH2>
        </a>
        <WaitlistForm />
      </div>
      <div className="as__right flex w-full min-h-full max-h-[100vh] justify-center items-center p-[16px]">
        {/* <WatchingVideosImg className="max-w-[500px]" /> */}
        <img src={GenerateScreenMockup} className="max-w-[500px]" />
      </div>
    </div>
  );
};

export default AuthScreen;
