import { HashLink } from "react-router-hash-link";
import logo from "../../assets/logos/navy.png";
import { TypographyH3 } from "../ui/typography";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SiteMap, SiteMapLink } from "@/types";
import MobileNavbar from "./MobileNavbar";
import "./Navbar.css";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { useLocation } from "react-router-dom";
import { Alert, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { config } from "@/config";

const actionBtnStyle = cn(buttonVariants({ variant: "accent", size: "sm" }));

export const getNavbarLinkElement = (link: SiteMapLink, index: number) => {
  switch (link.linkType) {
    case "hash":
      return (
        <HashLink key={index} className="font-poppins" to={link.slug} smooth>
          {link.displayName}
        </HashLink>
      );
    case "link":
      return (
        <NavigationMenuLink
          key={index}
          className={
            link.navbarSettings?.style === "action"
              ? actionBtnStyle
              : "font-poppins flex justify-center items-center"
          }
          href={link.slug}
          target={link.externalLink ? "_blank" : ""}
          rel={link.externalLink ? "noopener noreferrer" : ""}
        >
          {link.displayName}
        </NavigationMenuLink>
      );
  }
};

const Navbar = () => {
  const location = useLocation();
  const announcementHeaderRef = useRef<HTMLDivElement>(null);
  const [announcementHeight, setAnnouncementHeight] = useState(0);

  useEffect(() => {
    if (config.environment !== "production") {
      setAnnouncementHeight(announcementHeaderRef.current?.offsetHeight || 0);
    }
  }, [announcementHeaderRef]);

  const updateHideNavbar = (): boolean => {
    const slug = location.pathname as keyof typeof SiteMap;
    return SiteMap[slug]?.navbarSettings?.showNavbar === false ? true : false;
  };

  const extractLinks = (): SiteMapLink[] => {
    const links: SiteMapLink[] = [];
    const extract = (link: SiteMapLink) => {
      if (link.navbarSettings?.showInNavbar) {
        links.push(link);
      }
      Object.values(link.children).forEach((child) => {
        extract(child);
      });
    };
    Object.values(SiteMap).forEach((link) => {
      extract(link);
    });
    return links;
  };

  return (
    <>
      {config.environment !== "production" && (
        <Alert
          className="fixed left-0 w-full !z-[100] top-0 rounded-none bg-destructive px-[100px]"
          variant="destructive"
          ref={announcementHeaderRef}
          style={updateHideNavbar() ? { position: "sticky" } : {}}
        >
          <AlertTitle className="flex flex-row text-primary-foreground m-0 gap-4 w-full justify-center items-center text-center">
            <Terminal
              className="h-4 w-4"
              color="hsl(var(--primary-foreground))"
            />
            Heads up! You are on a staging site. There may be bugs or incomplete
            features.
          </AlertTitle>
        </Alert>
      )}
      <div
        className="navbar h-navbar-height w-full flex items-center flex-col backdrop-blur-[14px] fixed"
        style={{
          display: updateHideNavbar() ? "none" : "flex",
          top: announcementHeight,
        }}
      >
        <div className="web-menu flex h-full items-center justify-between px-[100px] w-full max-w-[1400px]">
          <a className="flex items-center" href="/">
            <img className="w-[24px] h-[24px] mb-[5px]" src={logo} />
            <TypographyH3 className="ml-[8px] text-foreground font-semibold">
              imaginit
            </TypographyH3>
          </a>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="flex gap-8 items-center">
                {extractLinks().map((link, index) =>
                  getNavbarLinkElement(link, index)
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <MobileNavbar hide={updateHideNavbar()} links={extractLinks()} />
    </>
  );
};

export default Navbar;
