import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, PlayIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { ExceededQuotaDialog } from "../CustomDialogs/ExceededQuotaDialog";

const VideoCreator = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [quota, setQuota] = useState<number>(3);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleGenerateBtn = () => {
    if (quota > 0) {
      setQuota(quota - 1);
      setVideo("Generating video...");
    } else {
      setOpenDialog(true);
    }
  };

  return (
    <div className="glass flex flex-col w-3/4 p-10 gap-5">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>You have {quota} videos remaining.</AlertTitle>
        <AlertDescription>
          Imaginit is currently in beta. Due to high demand, you can temporarily
          generate up to 3 videos for free.
        </AlertDescription>
      </Alert>
      <div className="flex flex-row gap-4">
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

        {/* <AlertDialog
          open={openAlert}
          onOpenChange={(open) => {
            if (quota <= 0) {
              setOpenAlert(open);
            }
          }}
        >
          <AlertDialogTrigger asChild>
            <Button className="icon-button" onClick={() => handleGenerateBtn()}>
              Generate
              <PlayIcon className="mb-[1px] ml-2" size={16} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>You have reached the limit</AlertDialogTitle>
              <AlertDialogDescription>
                We apologize for the inconvenience, but you have reached the
                limit of free videos. Sign up on our waitlist to get early
                access to more videos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </div>

      <Skeleton className="w-full h-[400px] rounded-md" />
    </div>
  );
};

export default VideoCreator;
