export class SiteMapLink {
  slug: string;
  displayName: string;
  children: { [key: string]: SiteMapLink };

  constructor(
    slug: string,
    children: { [key: string]: SiteMapLink },
    displayName: string
  ) {
    this.slug = slug;
    this.displayName = displayName;
    this.children = children ?? {};
  }
}

export enum SiteScreens {
  LANDING = "LandingScreen",
  GENERATE = "GenerateScreen",
}

export const SiteMap: Record<SiteScreens, SiteMapLink> = {
  [SiteScreens.LANDING]: {
    displayName: "Home",
    slug: "/",
    children: {
      LearnMore: {
        displayName: "Learn More",
        slug: "/#learn-more",
        children: {},
      },
      ScheduleDemo: {
        displayName: "Schedule Demo",
        slug: "/#demo",
        children: {},
      },
    },
  },
  [SiteScreens.GENERATE]: {
    displayName: "Generate",
    slug: "/generate",
    children: {},
  },
};
