import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { TypographyH1 } from "@/components/ui/typography";
import "./ScheduleDemoScreen.css";

const ScheduleDemoScreen = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "20min" });
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
    <div className="schedule-screen w-full min-h-full flex flex-col justify-center items-center px-[100px] max-w-[1400px] m-auto pt-[var(--navbar-height)]">
      <TypographyH1 className="schedule-screen__title text-center text-3xl sm:text-5xl mt-16 leading-[3.2rem]">
        interested? <a className="whitespace-nowrap">let's talk.</a>
      </TypographyH1>
      <div className="min-h-36 mt-10 mb-10 w-full">
        <Cal
          namespace="20min"
          calLink="imaginit/20min"
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", theme: "light" }}
        />
      </div>
    </div>
  );
};

export default ScheduleDemoScreen;
