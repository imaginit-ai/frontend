import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { TypographyH1 } from "@/components/ui/typography";

const ScheduleDemoScreen = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        styles: {
          branding: {
            brandColor: "#1c70ef",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <div className="w-full min-h-[calc(100%-var(--navbar-height)-var(--footer-height))] flex flex-col justify-center items-center px-[100px] max-w-[1400px] m-auto pt-16">
      <TypographyH1 className="text-center text-5xl">
        interested? let's talk.
      </TypographyH1>
      <div className="min-h-36 mt-10 mb-10 w-full">
        <Cal
          namespace="30min"
          calLink="imaginit/30min"
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", theme: "light" }}
        />
      </div>
    </div>
  );
};

export default ScheduleDemoScreen;
