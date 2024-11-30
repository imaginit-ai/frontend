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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { generateVideo } from "@/endpoints";

const formSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, { message: "Please enter a prompt" })
    .max(50, {
      message:
        "Please enter a prompt with less than 50 characters. We recommend keeping it short and sweet.",
    }),
});

const VideoCreator = () => {
  const [videoData, setVideoData] = useState<VideoData | undefined>({
    s3_url:
      "https://videos-universal.s3.us-east-2.amazonaws.com/Blockchain_7cc666cdc17c4def8f5beb534a99b8ba.mp4?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJHMEUCIFa07boiOdplGmolAAlculQPw0EIK2qJdgStL9Z%2FqcZcAiEA3JfK0c3lpA8Q34D%2FqAlAjx1Xgw5cCANf3YhyUoims2sqywMIZxAAGgw5NjEzNDE1MTMzMzkiDGkvXw%2Fmvdg6aIhFGSqoA18M5otM5DAqdjodF9ytoODJl3GnrV8NA0K2NLjlDcjc8qdoAvuOZdvC9LvjbBmH0shBkGKJGHAlSmryOMN8Qb2abiEQ5ELeabshcP12s8wIX6cRyEKr2wANLtT4LuXud9SI8kqRQXqIFrJFmzjAb%2FT85Sw7Jem7Zcgu0aT0HNfyuG991CKr5pSC1aAVP%2FLt0xE2BYeLsODeySS8%2BkwA8FdS9wP3cvyOEpGdJJRuhxorcRU52szCLQzkEFt6yAbarJRSFGaJ7BjwVZtSmV2hJGQkL96biltubittugEuCBRoaIqUWn4f8RctOAQi1wWpbHXKD3WwKesz%2FH%2B6UUHtQvCSHLlMVRNqvQM9NN%2BMmdBrDOHK9c7gtFF5wxHrhQ0LDZZrziE1BpSJ1twlvNI1wIg07N19tWbG8gIzNWB%2BegM1nkKH2GiUzxU%2BYTkdmQO3eceuLvHqgrHsNCk4BCZ6g%2FKRiI9oKIxqNx2jydUeHPQeG6daXz94lrQUEy8El2BcwNZoLFy13pvzh2Ks595TCTYex8W37chOwt2Q2usIfbpytwRhyXefl9sw3rCjugY65AIBJB16uXhyZ2T7tA6ODKk2jDpiuVDuOpiggbZC662DaMbwrCsma2pwMBETjw%2BsrRpqO9Oseh3Sa16AeGLBlCePdZ5fk4pM9BqJGXiTBAtzMb5FWxnGWh8ptScCnZNa1GLf%2ByAP5P2ey4i9Bj4P8%2FvG%2B7vjZcbkBcE8Nz2oX%2FVXD%2Fxmlt9V2jwPZ61sjQV7lp6VCfKX3ggmba6v%2Fvf%2Fg0ykQSLsZP%2Fa5%2FJWpxlgta%2Fp8eerJ4xwPbBTp3n04Ab1LWmkdSv1u6BnX7HpYVU%2FCKaoWKtxDxgnwKn24NxaUVnYroEIiFzSPSdQCdHC37wYmyMj6jp4j3bphnBTh0kLEvuZfe9eZplSdDqyZUHxYQWKxPFpMSkWeIGSVRC%2BvwyVo3axpzL64vU%2FicZAY%2FV%2FUxFoNMHlGu5%2FjCNK7MwDDqx5q5uOLAKjdXnZLsAH90oS6EOY9d%2Bd5ZIVshfXNiWozkptj1otDA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA57VDLLZ564KOI2Q5%2F20241128%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241128T214252Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=1568d956956b46d388b93acd265872cb07c6bde218878e9c932e49ea83086805",
    message: "Here's a video explaining blockchain.",
  });
  // const [videoData, setVideoData] = useState<VideoData | undefined>();
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
    const res = await generateVideo(values.prompt);
    if (res.success) {
      setVideoData(res.data);
      setState(VideoCreatorState.Idle);
    } else {
      setState(VideoCreatorState.Error);
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="icon-button"
              type="submit"
              disabled={
                !form.formState.isValid ||
                state === VideoCreatorState.GeneratingVideo
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
            <TypographyP className="text-center text-muted-foreground text-sm">
              This can take up to 2 minutes.
            </TypographyP>
            {/* <Progress
              value={progressValue}
              className="w-[360px] h-[8px] mt-6"
            /> */}
          </div>
        </Skeleton>
        {state === VideoCreatorState.Error && (
          <Alert variant="destructive" className="mt-6">
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
