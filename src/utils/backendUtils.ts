/**
 *
 * This is a temp file that will be replaced in the future with a more robust system.
 *
 */

export const generateVideo = async (prompt: string): Promise<string> => {
  const response = await fetch(
    `${process.env.REACT_APP_IMAGINIT_API_URL}/video?prompt=${prompt}`
  );

  if (!response.ok) {
    throw new Error("Failed to generate video");
  }

  return response.json();
};
