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
      <div
        className="navbar h-navbar-height w-full flex items-center flex-col backdrop-blur-[14px] fixed top-0"
        style={{ display: updateHideNavbar() ? "none" : "flex" }}
      >
        <div className="web-menu flex h-full items-center justify-between px-[100px] w-full max-w-[1400px]">
          <a className="flex items-center" href="/">
            <img className="w-[24px] h-[24px] mb-[5px]" src={logo} />
            <TypographyH3 className="ml-[10px] text-foreground font-semibold">
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
