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
  try {
    const res = await fetch(GENERATE_VIDEO_URL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to generate video");
    }
    const videoData = (await res.json()) as VideoData;
    return { data: videoData, success: true };
  } catch (error) {
    handleError(error, "Failed to generate video", "Please try again later.");
  }
  return { data: undefined, success: false };
}
