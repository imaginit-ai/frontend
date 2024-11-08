import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, PlayIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { ExceededQuotaDialog } from "../CustomDialogs/ExceededQuotaDialog";
import { VideoCreatorState } from "@/types";
import ReactPlayer from "react-player/lazy";
import { TypographyP } from "../ui/typography";
import { generateVideo } from "@/utils/backendUtils";

const VideoCreator = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [quota, setQuota] = useState<number | undefined>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [state, setState] = useState<VideoCreatorState>(VideoCreatorState.Idle);

  const handleGenerateBtn = async () => {
    if (quota && quota > 0) {
      updateQuota(quota - 1);
      setState(VideoCreatorState.GeneratingVideo);
      const res = await generateVideo(prompt);
      setVideo(res);
      setState(VideoCreatorState.Idle);
    } else {
      setOpenDialog(true);
    }
  };

  /********* TEMPORARY USE OF LOCAL STORAGE. CHANGE LATER ******* */
  const updateQuota = (newQuota: number) => {
    setQuota(newQuota);
    localStorage.setItem("quota", newQuota.toString());
  };

  useEffect(() => {
    const quota = localStorage.getItem("quota");
    if (quota) {
      setQuota(parseInt(quota));
    } else {
      setQuota(3);
      localStorage.setItem("quota", "3");
    }
  }, []);

  return (
    <div className="glass flex flex-col w-3/4 p-10 transition-all duration-300">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
          You have {quota !== 1 ? `${quota} videos` : `${quota} video`}{" "}
          remaining.
        </AlertTitle>
        <AlertDescription>
          Due to high demand, you can temporarily generate up to 3 videos for
          free. Join our waitlist for early access to more videos.
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
            if (quota && quota <= 0) {
              setOpenDialog(open);
            }
          }}
        >
          <Button
            className="icon-button"
            onClick={() => handleGenerateBtn()}
            disabled={
              prompt === "" || state === VideoCreatorState.GeneratingVideo
            }
          >
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
