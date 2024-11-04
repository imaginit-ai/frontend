import {
  TypographyH2,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";
import "./LearnMore.css";
import { AudioLines, ImagePlay, Timer } from "lucide-react";

const LearnMore = () => {
  return (
    <div
      className="learn-more w-full flex flex-col gap-[32px] scroll-mt-[100px] pb-24 "
      id="learn-more"
    >
      <div className="hiw__section glass">
        <TypographyH2 className="hiw__section-left">
          you imagine it, we animate it.
          {/* never stuggle with complex topics again. */}
        </TypographyH2>
        <div className="hiw__section-right">
          <div className="hiw__section-right__block">
            <div className="hiw__icon-container bg-accent-background">
              <ImagePlay className="hiw__icon text-accent" />
            </div>
            <TypographyH4>Engaging visuals</TypographyH4>
            <TypographyP className="mt-0 opacity-50 leading-7">
              Use groundbreaking AI models to turn complex topics into
              bite-sized video animations.
            </TypographyP>
          </div>
          <div className="hiw__section-right__block">
            <div className="hiw__icon-container bg-accent-background">
              <AudioLines className="hiw__icon text-accent" />
            </div>
            <TypographyH4>Automatic voice overs</TypographyH4>
            <TypographyP className="mt-0 opacity-50 leading-7">
              Imaginit automatically applies realistic AI voice overs to walk
              you through the content.
            </TypographyP>
          </div>
          <div className="hiw__section-right__block">
            <div className="hiw__icon-container bg-accent-background">
              <Timer className="hiw__icon text-accent" />
            </div>
            <TypographyH4>Instant results</TypographyH4>
            <TypographyP className="mt-0 opacity-50 leading-7">
              Get your video in minutes, not hours. Share it with your friends
              or use it in your next presentation.
            </TypographyP>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
