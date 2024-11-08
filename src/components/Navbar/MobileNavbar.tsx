import { useEffect, useState } from "react";
import "./Navbar.css";
import { SiteMapLink } from "@/types";
import { TypographyH3 } from "../ui/typography";
import logo from "../../assets/logos/navy.png";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { getNavbarLinkElement } from "./Navbar";

type MobileNavbarProps = {
  hide: boolean;
  links: SiteMapLink[];
};

const MobileNavbar = (props: MobileNavbarProps) => {
  const [open, setOpen] = useState(false);

  const actionBtnStyle = cn(buttonVariants({ variant: "accent", size: "sm" }));

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const extractActionLinks = () => {
    const actionLinks = props.links.filter(
      (link) => link.navbarSettings?.style === "action"
    );
    return actionLinks;
  };

  return (
    <>
      <div
        className="navbar mobile h-navbar-height w-full flex items-center flex-col bg-background fixed top-0"
        style={{ display: props.hide ? "none" : "" }}
      >
        <div className="mobile-menu">
          <a className="flex items-center" href="/">
            <img className="w-[24px] h-[24px] mb-[5px]" src={logo} />
            <TypographyH3 className="ml-[10px] text-foreground font-semibold">
              imaginit
            </TypographyH3>
          </a>
          <div className="flex flex-row justify-center items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {extractActionLinks().map((link, index) => (
                  <NavigationMenuLink
                    key={index}
                    className={
                      actionBtnStyle +
                      " mobile-menu__action-btn text-[12px] mr-2 px-2 h-[32px] sm:h-9 sm:px-3 sm:text-sm sm:mr-8"
                    }
                    href={link.slug}
                  >
                    {link.displayName}
                  </NavigationMenuLink>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <button
              name="Toggle Menu"
              aria-label="Toggle Menu"
              className={"hamburger mobile-menu-btn" + (open ? " active" : "")}
              onClick={() => setOpen(!open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <div
            className={
              "mobile-menu-content bg-background " + (open ? " active" : "")
            }
          >
            {props.links.map(
              (link, index) =>
                index !== props.links.length - 1 && (
                  <div
                    key={index}
                    className="mobile-menu-item"
                    onClick={() => setOpen(false)}
                  >
                    {getNavbarLinkElement(link, index)}
                    <Separator orientation="horizontal" />
                  </div>
                )
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <div
        className={
          "mobile-menu-overlay bg-primary/70" + (open ? " active" : "")
        }
        style={{ display: props.hide ? "none" : "" }}
        onClick={() => setOpen(false)}
      />
    </>
  );
};

export default MobileNavbar;
