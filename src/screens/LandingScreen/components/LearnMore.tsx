import {
  TypographyH2,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";
import "./LearnMore.css";
import { AudioLines, ImagePlay, Timer } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LearnMore = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.4, once: true });
  return (
    <div
      className="learn-more w-full flex flex-col gap-[32px] scroll-mt-[100px] pb-40"
      id="learn-more"
      ref={containerRef}
    >
      <div className="hiw__section glass rounded-[34px] flex flex-col">
        <TypographyH2 className="hiw__section-left text-3xl leading-[3.2rem]">
          you imagine it, we animate it.
        </TypographyH2>
        <div className="hiw__section-right flex flex-row">
          <motion.div
            className="hiw__section-right__block"
            style={{
              opacity: isInView ? 1 : 0,
              filter: isInView ? "blur(0px)" : "blur(10px)",
              transition: "all 0.5s ease-in-out",
              transitionDelay: `${0.5 + 0 * 0.15}s`,
            }}
          >
            <div className="hiw__icon-container bg-accent-background">
              <ImagePlay className="hiw__icon text-accent" />
            </div>
            <TypographyH4>Engaging visuals</TypographyH4>
            <TypographyP className="mt-0 opacity-50 leading-7">
              Use groundbreaking AI models to turn complex topics into engaging
              video animations.
            </TypographyP>
          </motion.div>
          <motion.div
            className="hiw__section-right__block"
            style={{
              opacity: isInView ? 1 : 0,
              filter: isInView ? "blur(0px)" : "blur(10px)",
              transition: "all 0.5s ease-in-out",
              transitionDelay: `${0.5 + 1 * 0.15}s`,
            }}
          >
            <div className="hiw__icon-container bg-accent-background">
              <AudioLines className="hiw__icon text-accent" />
            </div>
            <TypographyH4>Automatic voice overs</TypographyH4>
            <TypographyP className="mt-0 opacity-50 leading-7">
              Imaginit automatically applies realistic AI voice overs to walk
              you through the content.
            </TypographyP>
          </motion.div>
          <motion.div
            className="hiw__section-right__block"
            style={{
              opacity: isInView ? 1 : 0,
              filter: isInView ? "blur(0px)" : "blur(10px)",
              transition: "all 0.5s ease-in-out",
              transitionDelay: `${0.5 + 2 * 0.15}s`,
            }}
          >
            <div className="hiw__icon-container bg-accent-background">
              <Timer className="hiw__icon text-accent" />
            </div>
            <TypographyH4>Instant results</TypographyH4>
            <TypographyP className="mt-0 opacity-50 leading-7">
              Get your video in minutes, not hours. Share it with your friends
              or use it in your next presentation.
            </TypographyP>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
