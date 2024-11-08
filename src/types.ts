export class SiteMapLink {
  slug: string;
  linkType: "hash" | "link";
  displayName: string;
  children: { [key: string]: SiteMapLink };
  navbarSettings?: {
    showInNavbar?: boolean;
    showNavbar?: boolean;
    style?: "action" | "default";
  };
  authProtected?: boolean;
  externalLink?: boolean;

  constructor(
    slug: string,
    linkType: "hash" | "link",
    displayName: string,
    children: { [key: string]: SiteMapLink },
    navbarSettings?: {
      showInNavbar?: boolean;
      showNavbar?: boolean;
      style?: "action" | "default";
    },
    authProtected?: boolean,
    externalLink?: boolean
  ) {
    this.slug = slug;
    this.linkType = linkType;
    this.displayName = displayName;
    this.children = children;
    this.navbarSettings = {
      showNavbar: true,
      showInNavbar: false,
      style: "default",
      ...navbarSettings,
    };
    this.authProtected = authProtected ?? false;
    this.externalLink = externalLink ?? false;
  }
}

export enum SiteScreens {
  LANDING = "/",
  SCHEDULE_DEMO = "/schedule-demo",
  AUTH = "/waitlist", // TODO: Change to /auth
  GENERATE = "/generate",
}

export const SiteMap: Record<SiteScreens, SiteMapLink> = {
  [SiteScreens.LANDING]: {
    linkType: "link",
    displayName: "Home",
    slug: SiteScreens.LANDING,
    children: {
      LearnMore: {
        linkType: "hash",
        displayName: "Learn More",
        slug: "/#learn-more",
        children: {},
        navbarSettings: {
          showInNavbar: true,
        },
      },
    },
  },
  [SiteScreens.SCHEDULE_DEMO]: {
    linkType: "link",
    displayName: "Schedule Demo",
    slug: SiteScreens.SCHEDULE_DEMO,
    children: {},
    navbarSettings: {
      showInNavbar: true,
    },
  },
  [SiteScreens.AUTH]: {
    linkType: "link",
    displayName: "Join Waitlist",
    slug: SiteScreens.AUTH,
    children: {},
    navbarSettings: {
      showInNavbar: true,
      showNavbar: false,
      style: "action",
    },
  },
  [SiteScreens.GENERATE]: {
    linkType: "link",
    displayName: "Generate",
    slug: SiteScreens.GENERATE,
    children: {},
    authProtected: true,
    navbarSettings: {
      showNavbar: false,
    },
  },
};

export enum VideoCreatorState {
  Idle = "Idle",
  LoadingQuota = "LoadingQuota",
  GeneratingVideo = "GeneratingVideo",
  Error = "Error",
}

/**
 * 
 *   {
    "amount_referred": 0,
    "created_at": "2022-04-10_18-34-28",
    "email": "example9911@example.com",
    "priority": 4985,
    "referral_link": "https://getwaitlist.com?ref_id=4F0BTBMAB",
    "referral_token": "4F0BTBMAB",
    "referred_by_signup_token": "REFTOKEN1",
    "removed_date": null,
    "removed_priority": null,
    "uuid": "c60ff9f2-1a58-4551-87ea-414991184fba",
    "verified": false,
    "waitlist_id": 12345
  }
 * 
 */

export type WaitlistUser = {
  amount_referred: number;
  created_at: string;
  email: string;
  priority: number;
  referral_link: string;
  referral_token: string;
  referred_by_signup_token: string;
  removed_date: string | null;
  removed_priority: number | null;
  uuid: string;
  verified: boolean;
  waitlist_id: number;
};

export type WaitlistLocation = {
  country_code: string;
  country_name: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  IPv4: string;
  state: string;
};
