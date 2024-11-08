import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";

export const handleError = (
  error: unknown,
  userTitle?: string,
  userDescription?: string,
  hideToast?: boolean,
  hidePrint?: boolean
): string => {
  if (!hideToast) {
    toast({
      variant: "destructive",
      title: userTitle || "Uh oh! Something went wrong.",
      description:
        userDescription ||
        "Try again or click the button below to report the issue.",
      action: (
        <ToastAction altText="Report Issue" onClick={() => reportError(error)}>
          Report Issue
        </ToastAction>
      ),
    });
  }
  const errorObject = ensureError(error);
  if (!hidePrint) {
    console.error(errorObject.message);
  }
  return errorObject.message;
};

const ensureError = (value: unknown): Error => {
  if (value instanceof Error) return value;

  let stringified = "[Unable to stringify the thrown value]";
  try {
    stringified = JSON.stringify(value);
  } catch {}
  const error = new Error(`[Thrown Value]: ${stringified}`);
  return error;
};

export const reportError = (error: unknown) => {
  //  TODO: Implement error reporting
  console.error(error);
};
