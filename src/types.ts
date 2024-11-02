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
}

export const SiteMap: Record<SiteScreens, SiteMapLink> = {
  [SiteScreens.LANDING]: {
    displayName: "Home",
    slug: "/",
    children: {
      HowItWorks: {
        displayName: "How it works",
        slug: "/#how-it-works",
        children: {},
      },
    },
  },
};
