import { FragileResponse, VideoData } from "./types";
import { handleError } from "./utils/errorUtils";
import axios from "axios";

enum Backend {
  Local = import.meta.env.VITE_LOCAL_API_URL,
  Staging = import.meta.env.VITE_STAGING_API_URL,
  Production = import.meta.env.VITE_PROD_API_URL,
}

const BACKEND_URL = Backend.Production;

// Video Generation
export const GENERATE_VIDEO_URL = () => `${BACKEND_URL}/video/generate`;

export async function generateVideo(
  prompt: string
): Promise<FragileResponse<VideoData>> {
  try {
    const res = await axios.post(
      GENERATE_VIDEO_URL(),
      {
        prompt,
        is_not_shepherd: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_IMAGINIT_API_KEY,
        },
      }
    );
    if (res.status !== 200 || !res.data) {
      handleError(
        res.statusText,
        "Failed to generate video",
        "Please try again later."
      );
      return { data: undefined, success: false };
    }
    return { data: res.data as VideoData, success: true };
  } catch (error) {
    handleError(error, "Failed to generate video", "Please try again later.");
    return { data: undefined, success: false };
  }
}
