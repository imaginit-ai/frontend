import { useEffect, useState } from "react";
import "./Navbar.css";
import { NavbarLink, SiteMap } from "@/types";
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
  links: NavbarLink[];
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

  return (
    <div className="mobile-menu">
      <a className="flex items-center" href="/">
        <img className="w-[24px] h-[24px] mb-[5px]" src={logo} />
        <TypographyH3 className="ml-[10px] text-foreground font-semibold">
          imaginit
        </TypographyH3>
      </a>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuLink
            className={
              actionBtnStyle +
              " mobile-menu__action-btn text-[12px] mr-2 px-2 h-[32px] sm:h-9 sm:px-3 sm:text-sm sm:mr-8"
            }
            href={SiteMap.GenerateScreen.slug}
          >
            {SiteMap.GenerateScreen.displayName}
          </NavigationMenuLink>
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
          <div className={"mobile-menu-content" + (open ? " active" : "")}>
            {props.links.map(
              (link, index) =>
                index !== props.links.length - 1 && (
                  <div key={index} className="mobile-menu-item">
                    {getNavbarLinkElement(link, index)}
                    <Separator orientation="horizontal" />
                  </div>
                )
            )}
          </div>
          <div
            className={
              "mobile-menu-overlay bg-primary/70" + (open ? " active" : "")
            }
            onClick={() => setOpen(false)}
          />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MobileNavbar;
