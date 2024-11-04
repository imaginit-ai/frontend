import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, PlayIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { ExceededQuotaDialog } from "../CustomDialogs/ExceededQuotaDialog";
import { VideoCreatorState } from "@/types";
import ReactPlayer from "react-player/lazy";
import { TypographyP } from "../ui/typography";

const VideoCreator = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [quota, setQuota] = useState<number>(3);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [state, setState] = useState<VideoCreatorState>(VideoCreatorState.Idle);

  const handleGenerateBtn = async () => {
    if (quota > 0) {
      setQuota(quota - 1);
      setState(VideoCreatorState.GeneratingVideo);
      // const res = await generateVideo(prompt);
      setVideo("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      setState(VideoCreatorState.Idle);
    } else {
      setOpenDialog(true);
    }
  };

  return (
    <div className="glass flex flex-col w-3/4 p-10 transition-all duration-300">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>You have {quota} videos remaining.</AlertTitle>
        <AlertDescription>
          Imaginit is currently in beta. Due to high demand, you can temporarily
          generate up to 3 videos for free.
        </AlertDescription>
      </Alert>
      <div className="flex flex-row gap-4 mt-5">
        <Input
          type="text"
          placeholder="Explain blockchain"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <ExceededQuotaDialog
          open={openDialog}
          onOpenChange={(open) => {
            if (quota <= 0) {
              setOpenDialog(open);
            }
          }}
        >
          <Button className="icon-button" onClick={() => handleGenerateBtn()}>
            Generate
            <PlayIcon className="mb-[1px] ml-2" size={16} />
          </Button>
        </ExceededQuotaDialog>
      </div>
      <Skeleton
        className="w-full rounded-md aspect-video transition-all max-h:duration-300"
        style={{
          maxHeight:
            state === VideoCreatorState.GeneratingVideo ? "1000px" : "0px",
          marginTop:
            state === VideoCreatorState.GeneratingVideo ? "20px" : "0px",
          opacity: state === VideoCreatorState.GeneratingVideo ? 1 : 0,
        }}
      >
        <div
          className="w-full h-full flex justify-center items-center"
          style={{
            display:
              state === VideoCreatorState.GeneratingVideo ? "flex" : "none",
          }}
        >
          <TypographyP className="text-center text-muted-foreground text-xl">
            Generating video...
          </TypographyP>
        </div>
      </Skeleton>
      {state === VideoCreatorState.Error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Failed to generate video</AlertTitle>
          <AlertDescription>
            An unexpected error occurred. Please try again later.
          </AlertDescription>
        </Alert>
      )}
      {state === VideoCreatorState.Idle && video !== "" && (
        <div className="w-full flex justify-center items-center mt-5">
          <ReactPlayer
            controls={true}
            url={video}
            width={"100%"}
            height={"fit-content"}
            style={{
              aspectRatio: "854/480",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoCreator;
