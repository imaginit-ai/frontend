import { HashLink } from "react-router-hash-link";
import logo from "../../assets/logos/navy.png";
import { TypographyH3 } from "../ui/typography";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavbarLink, SiteMap } from "@/types";
import MobileNavbar from "./MobileNavbar";
import "./Navbar.css";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const actionBtnStyle = cn(buttonVariants({ variant: "accent", size: "sm" }));

export const getNavbarLinkElement = (
  link: NavbarLink,
  index: number,
  mobile?: boolean
) => {
  switch (link.type) {
    case "hash":
      return (
        <HashLink key={index} className="font-poppins" to={link.url} smooth>
          {link.name}
        </HashLink>
      );
    case "link":
      return (
        <NavigationMenuLink
          key={index}
          className="font-poppins flex justify-center items-center"
          href={link.url}
        >
          {link.name}
        </NavigationMenuLink>
      );
    case "external":
      return (
        <NavigationMenuLink
          key={index}
          className="font-poppins flex justify-center items-center"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.name}
        </NavigationMenuLink>
      );
    case "action":
      return (
        <NavigationMenuLink
          key={index}
          className={actionBtnStyle}
          href={link.url}
        >
          {link.name}
        </NavigationMenuLink>
      );
  }
};

const Navbar = () => {
  const links: NavbarLink[] = [
    {
      name: SiteMap.LandingScreen.children.LearnMore.displayName,
      url: SiteMap.LandingScreen.children.LearnMore.slug,
      type: "hash",
    },
    {
      name: "Join Waitlist",
      url: "https://getwaitlist.com/waitlist/21884",
      type: "external",
    },
    {
      name: SiteMap.ScheduleDemoScreen.displayName,
      url: SiteMap.ScheduleDemoScreen.slug,
      type: "link",
    },
    {
      name: SiteMap.GenerateScreen.displayName,
      url: SiteMap.GenerateScreen.slug,
      type: "action",
    },
  ];

  return (
    <div className="navbar h-navbar-height w-full flex items-center flex-col backdrop-blur-[14px] fixed top-0 z-50">
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
              {links.map((link, index) => getNavbarLinkElement(link, index))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* <Separator /> */}
      <MobileNavbar links={links} />
    </div>
  );
};

export default Navbar;
