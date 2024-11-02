import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import "./ScheduleDemo.css";
import { TypographyH1 } from "@/components/ui/typography";

const ScheduleDemo = () => {
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
    <div
      className="schedule-demo w-full flex flex-col gap-[32px] scroll-mt-[100px]"
      id="demo"
    >
      <TypographyH1 className="text-center">
        interested? let's talk.
      </TypographyH1>
      <Cal
        namespace="30min"
        calLink="imaginit/30min"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
};

export default ScheduleDemo;
