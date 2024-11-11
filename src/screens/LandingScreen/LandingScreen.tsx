import "./LandingScreen.css";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
} from "@/components/ui/typography";
import { ArrowRight, Calendar } from "lucide-react";
import NavyLogo from "../../assets/logos/navy.png";
import { SiteScreens } from "@/types";
import LearnMore from "./components/LearnMore";
import { useNavigate } from "react-router-dom";
import { JoinWaitlist } from "./components/JoinWaitlist";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LandingVideo from "../../assets/ImaginitLandingVideo.mp4";
import DemoVideo1 from "../../assets/demos/SimpleHarmonicMotion.mp4";
import DemoVideo2 from "../../assets/demos/LargeLanguageModels.mp4";
import DemoVideo3 from "../../assets/demos/AcidBaseReactions.mp4";
import LandingThumbnail from "../../assets/landing-thumbnail.png";
import Thumbnail1 from "../../assets/demos/thumbnails/thumbnail1.png";
import Thumbnail2 from "../../assets/demos/thumbnails/thumbnail2.png";
import Thumbnail3 from "../../assets/demos/thumbnails/thumbnail3.png";
import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";
import generateScreen from "../../assets/generate-screen-mockup.png";

const LandingScreen = () => {
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const [api, setApi] = useState<CarouselApi>();
  const videoRef = useRef<HTMLDivElement>(null);
  const showcaseVideoRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const demoVideos = [DemoVideo1, DemoVideo2, DemoVideo3];
  const thumbnails = [Thumbnail1, Thumbnail2, Thumbnail3];

  const demoVideoPrompts = [
    "Explain simple harmonic motion.",
    "How do LLMs work?",
    "Explain acid-base Reactions.",
  ];

  const actionBtnStyle = cn(
    buttonVariants({ variant: "accent", size: "sm" }),
    "bg-accent  hover:bg-accent"
  );

  const getDemoVideoHeight = () => {
    if (videoRef.current && videoRef.current.clientWidth) {
      return videoRef.current.clientWidth * (9 / 16);
    }
    return 275;
  };

  const getShowcaseVideoHeight = () => {
    if (showcaseVideoRef.current && showcaseVideoRef.current.clientWidth) {
      return showcaseVideoRef.current.clientWidth * (9 / 16);
    }
    return 275;
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="landing-screen flex flex-col w-full items-center justify-start px-[100px] max-w-[1400px] m-auto mt-[var(--navbar-height)]">
      <div className="landing__top pb-16 pt-[3rem] flex flex-col items-center justify-center gap-10 max-w-[1000px]">
        <div className="landing__header-container flex flex-col gap-6 max-w-[865px] justify-center items-center">
          <div className="landing__header flex justify-center mt-[24px]">
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
            Learn visually with personalized, AI-generated animations for every
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
      <motion.div
        // style={{ scale }}
        className="landing-video relative mb-10 w-full"
        ref={showcaseVideoRef}
      >
        <img src={generateScreen} className="w-full" />
        <ReactPlayer
          url={LandingVideo}
          controls={true}
          width={"100%"}
          height={`calc(${getShowcaseVideoHeight()}px + 3.7vw)`}
          light={LandingThumbnail}
          playing={true}
          style={{
            overflow: "hidden",
            position: "absolute",
            top: "calc(3px - 2.335vw)",
            transform: "scale(0.77)",
            left: "0.15vw",
            transformOrigin: "center",
            border: "none !important",
            outline: "none !important",
          }}
        />
      </motion.div>
      <LearnMore />
      <div className="demo-video-section w-full flex flex-row items-center gap-20 mb-36 md:mb-40">
        <div className="w-full flex flex-col items-start justify-start gap-9 relative self-start md:gap-12">
          <TypographyH2 className="demo-title text-center font-semibold text-[36px] md:text-left md:text-[46px] leading-[3.6rem]">
            no matter the topic, we've got you covered.
          </TypographyH2>
          <p className="message-bubble receive">
            {demoVideoPrompts[current - 1]}
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center h-full">
          <Carousel
            className="w-full h-full"
            setApi={setApi}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {demoVideos.map((videoSrc, index) => (
                <CarouselItem key={index}>
                  <div className="h-full" ref={videoRef}>
                    <ReactPlayer
                      url={videoSrc}
                      controls
                      width={"100%"}
                      playing={current - 1 === index}
                      height={getDemoVideoHeight()}
                      light={thumbnails[index]}
                      style={{
                        borderRadius: "16px",
                        overflow: "hidden",
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="landing-slider-control prev" />
            <CarouselNext className="landing-slider-control next" />
          </Carousel>
        </div>
      </div>
      <JoinWaitlist />
    </div>
  );
};

export default LandingScreen;
