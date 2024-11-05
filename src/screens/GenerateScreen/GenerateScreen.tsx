import { TypographyH1 } from "@/components/ui/typography";
import VideoCreator from "@/components/VideoCreator/VideoCreator";
import logo from "../../assets/logos/navy.png";
import { Badge } from "@/components/ui/badge";

const GenerateScreen = () => {
  return (
    <div className="w-full min-h-full flex flex-col items-center justify-start max-w-[1400px] m-auto pt-[var(--navbar-height)]">
      <div className="flex flex-col items-center justify-center w-full mt-16">
        <div className="flex items-center mb-10">
          <img className="w-[48px] h-[48px] mb-[8px]" src={logo} />
          <TypographyH1 className="ml-[18px] text-5xl text-foreground font-semibold">
            imaginit
          </TypographyH1>
          <Badge className="ml-2" variant="default">
            Beta
          </Badge>
        </div>
        <VideoCreator />
      </div>
    </div>
  );
};

export default GenerateScreen;
