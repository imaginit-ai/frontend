import { TypographyH2 } from "@/components/ui/typography";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <div
      className="how-it-works w-full flex flex-col gap-[32px] scroll-mt-[100px]"
      id="how-it-works"
    >
      <div className="hiw__section glass">
        <TypographyH2 className="hiw__section-left">
          you imagine it. we animate it.
        </TypographyH2>
        <div className="hiw__section-right">
          {/* <div className="hiw__section-right__block">
            <div className="hiw__icon-container bg-accent-background">
              <Cctv className="hiw__icon text-accent" />
            </div>
            <TypographyH4>Data tracking</TypographyH4>
            <TypographyP className="mt-0 opacity-50 leading-7">
              Email providers like Gmail, Outlook, and Yahoo scan your emails to
              build profiles and profit from your data.
            </TypographyP>
          </div>
          <div className="hiw__section-right__block">
            <div className="hiw__icon-container bg-accent-background">
              <OctagonX className="hiw__icon text-accent" />
            </div>
            <TypographyH4>Loss of control</TypographyH4>
            <TypographyP className="mt-0 opacity-50 leading-7">
              Once you share sensitive data through an email or text, you lose
              all control over it.
            </TypographyP>
          </div>
          <div className="hiw__section-right__block">
            <div className="hiw__icon-container bg-accent-background">
              <ShieldAlert className="hiw__icon text-accent" />
            </div>
            <TypographyH4>Susceptible to attacks</TypographyH4>
            <TypographyP className="mt-0 opacity-50 leading-7">
              Emails are especially the target for phishing attacks and data
              breaches.
            </TypographyP>
          </div> */}
        </div>
      </div>
      {/* <div className="hiw__section">
        <TypographyH2 className="text-[36px] w-1/2 text-left">
          it's time to be in control of your data.
        </TypographyH2>
      </div> */}
    </div>
  );
};

export default HowItWorks;
