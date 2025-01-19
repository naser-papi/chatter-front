import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Branding,
  DesktopMenu,
  MobileMenu,
  UserMenu,
} from "@/components/organism/app-bar";
import { css } from "@emotion/css";

function ResponsiveAppBar() {
  return (
    <AppBar
      position="relative"
      className={css`
        container-type: inline-size;
        container-name: app-bar;
        margin: 0 auto;
        padding: 0 1rem;
        max-height: 70px;

        .branding {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;

          .brand-name {
            margin-right: 2rem; /* Equivalent to mr: 2 */
            display: flex; /* This can depend on the breakpoint (handled below) */
            font-family: monospace;
            font-weight: 700;
            letter-spacing: 0.3rem;
            color: white;
            text-decoration: none;

            &:visited {
              color: white;
            }
          }
        }

        .desktop-menu {
          margin-left: 60px;
          display: none;
        }

        .mobile-menu {
          display: flex;
        }

        .user-menu {
          margin-left: auto;
        }

        @container app-bar (width <= 720px) {
          .branding {
            position: absolute;
            inset: 0 50%;
            transform: translateX(-50%);
            width: 170px;
          }
        }
        @container app-bar (width>720px) {
          .mobile-menu {
            display: none;
          }

          .desktop-menu {
            display: flex;
          }
        }
      `}
    >
      <Toolbar disableGutters>
        <Box className={"branding"}>
          <Branding />
        </Box>
        <Box className={"mobile-menu"}>
          <MobileMenu />
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
        <Box className={"desktop-menu"}>
          <DesktopMenu />
        </Box>
        <Box className={"user-menu"}>
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
