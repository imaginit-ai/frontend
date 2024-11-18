import { FragileResponse, VideoData } from "./types";
import { handleError } from "./utils/errorUtils";

enum Backend {
  Local = import.meta.env.VITE_LOCAL_API_URL,
  Staging = import.meta.env.VITE_STAGING_API_URL,
  Production = import.meta.env.VITE_PROD_API_URL,
}

const BACKEND_URL = Backend.Production;

// Video Generation
export const GENERATE_VIDEO_URL = () => `${BACKEND_URL}/video`;

// Video Generation
export async function generateVideo(
  userID: string,
  prompt: string
): Promise<FragileResponse<VideoData>> {
  const formData = new FormData();
  formData.append("concept", prompt);
  formData.append("age", "18");
  formData.append("max_retries", "3");

  try {
    const res = await fetch(GENERATE_VIDEO_URL(), {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "imaginit-header": import.meta.env.VITE_IMAGINIT_HEADER,
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (!res.ok) {
      handleError(
        res.statusText,
        "Failed to generate video",
        "Please try again later."
      );
      return { data: undefined, success: false };
    }

    const resData = (await res.json()) as VideoData;
    return { data: resData, success: true };
  } catch (error) {
    handleError(error, "Failed to generate video", "Please try again later.");
    return { data: undefined, success: false };
  }
}
