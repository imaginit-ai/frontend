import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, PlayIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { VideoCreatorState, VideoData } from "@/types";
import { TypographyP } from "../ui/typography";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { generateVideo } from "@/endpoints";

const formSchema = z.object({
  prompt: z.string().min(1),
});

const VideoCreator = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [videoData, setVideoData] = useState<VideoData | undefined>();
  const [quota, setQuota] = useState<number>(5);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [state, setState] = useState<VideoCreatorState>(VideoCreatorState.Idle);
  const [progressValue, setProgressValue] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const watchPromptInput = form.watch("prompt");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setState(VideoCreatorState.GeneratingVideo);
    const res = await generateVideo("", prompt);
    if (res.success) {
      setVideoData(res.data);
      setState(VideoCreatorState.Idle);
    }
  };

  return (
    <div className="w-3/4">
      <div className="glass rounded-xl flex flex-col w-full p-6 transition-all duration-300">
        {/* <Alert className="mb-5">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>
          You have {quota !== 1 ? `${quota} videos` : `${quota} video`}{" "}
          remaining.
        </AlertTitle>
        <AlertDescription>
          Due to high demand, you can temporarily generate up to 5 videos a day
          for free.
        </AlertDescription>
      </Alert> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-row gap-4"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Ask me to explain anything..."
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="icon-button"
              type="submit"
              disabled={
                !watchPromptInput || state === VideoCreatorState.GeneratingVideo
              }
            >
              Generate
              <PlayIcon className="mb-[1px] ml-2" size={16} />
            </Button>
          </form>
        </Form>
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
            className="w-full h-full flex justify-center items-center flex-col"
            style={{
              display:
                state === VideoCreatorState.GeneratingVideo ? "flex" : "none",
            }}
          >
            <TypographyP className="text-center text-muted-foreground text-xl">
              Generating video...
            </TypographyP>
            {/* <Progress
              value={progressValue}
              className="w-[360px] h-[8px] mt-6"
            /> */}
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
      </div>
      {state === VideoCreatorState.Idle && videoData?.s3_url && (
        <div className="w-full flex justify-center items-center mt-5 overflow-hidden rounded-md glass">
          <video
            className="w-full rounded-md"
            src={videoData.s3_url}
            controls={true}
            autoPlay={true}
          />
        </div>
      )}
    </div>
  );
};

export default VideoCreator;
