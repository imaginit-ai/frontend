/**
 * 
 * 
 * curl --request POST \
  --url https://api.getwaitlist.com/api/v1/signup \
  --header 'Content-Type: application/json' \
  --data '{
    "email": "example9911@example.com",
    "waitlist_id": 12345,
    "referral_link": "https://getwaitlist.com/?ref_id=REFTOKEN1",
    "metadata": {"my_data": 1234},
    "answers": [{'question_value': "What is your favorite animal?", 'optional': false, "answer_value": "Cat"}],
  }'
 * 
 */

import { WaitlistLocation, WaitlistUser } from "@/types";

export const createSignup = async (
  email: string,
  answers: {
    question_value: string;
    optional: boolean;
    answer_value: string;
  }[],
  metadata: any,
  referral_link?: string
): Promise<WaitlistUser> => {
  const response = await fetch(`https://api.getwaitlist.com/api/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      waitlist_id: 21884,
      answers,
      referral_link,
      metadata,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to signup");
  }
  return (await response.json()) as WaitlistUser;
};

export const fetchGeoLocation = async (): Promise<WaitlistLocation | {}> => {
  try {
    const locationRes = await fetch("https://geolocation-db.com/json/");
    const locationData = (await locationRes.json()) as WaitlistLocation;
    return locationData;
  } catch (error) {
    return {};
  }
};
