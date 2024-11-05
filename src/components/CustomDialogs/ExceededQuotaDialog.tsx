import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SiteMap } from "@/types";
import { ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ExceededQuotaDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
};

export const ExceededQuotaDialog = (props: ExceededQuotaDialogProps) => {
  const navigate = useNavigate();
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader className="mb-4">
          <DialogTitle>You have reached the video limit</DialogTitle>
          <DialogDescription className="text-primary">
            Join our waitlist for early access to more videos, or book a demo to
            see how Imaginit can be implemented in your organization.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center sm:justify-start">
          <Button
            className="icon-button text-[12px] mr-4 px-3 h-[36px] sm:h-9 sm:px-3 sm:text-sm sm:mr-8"
            variant={"outline"}
            onClick={() =>
              window.open("https://getwaitlist.com/waitlist/21884")
            }
          >
            <Calendar className="mr-2" size={16} />
            Schedule Demo
          </Button>
          <Button
            className="icon-button text-[12px] px-3 h-[36px] sm:h-9 sm:px-3 sm:text-sm sm:mr-8"
            onClick={() => navigate(SiteMap.ScheduleDemoScreen.slug)}
          >
            Join Waitlist
            <div className="relative w-[18px] h-[18px]">
              <ArrowRight className="icon-button-icon" size={18} />
            </div>
          </Button>
        </div>
        {/* <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
