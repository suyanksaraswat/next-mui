import { useEffect, useState } from "react";
// next
import { useRouter } from "next/router";
import NextLink from "next/link";
// @mui
import {
  Box,
  Collapse,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
// config
import { NAVBAR } from "../../config";
// components
import { IconButtonAnimate } from "../../components/animate";
import { NavSectionVertical } from "../../components/nav-section";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
//
import { MenuItemProps, MenuProps } from "./type";

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItemButton)<ListItemButtonProps>(
  ({ theme }) => ({
    ...theme.typography.body2,
    textTransform: "capitalize",
    height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
    color: theme.palette.text.secondary,
  })
);

// ----------------------------------------------------------------------

export default function MenuMobile({ isOffset, isHome, navConfig }: MenuProps) {
  const { pathname } = useRouter();

  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: "common.white" }),
          ...(isOffset && { color: "text.primary" }),
        }}
      >
        <MenuIcon />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List disablePadding>
            {navConfig.map((link) => (
              <MenuMobileItem
                key={link.title}
                item={link}
                isOpen={open}
                onOpen={handleOpen}
              />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

type MenuMobileItemProps = {
  item: MenuItemProps;
  isOpen: boolean;
  onOpen: VoidFunction;
};

function MenuMobileItem({ item, isOpen, onOpen }: MenuMobileItemProps) {
  const { pathname } = useRouter();
  const { title, path, icon, children } = item;

  const isActive = pathname === path;

  if (children) {
    return (
      <>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          {isOpen ? (
            <KeyboardArrowDownIcon sx={{ width: 16, height: 16, ml: 1 }} />
          ) : (
            <KeyboardArrowRightIcon sx={{ width: 16, height: 16, ml: 1 }} />
          )}
        </ListItemStyle>

        <Collapse in={isOpen} unmountOnExit>
          <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
            <NavSectionVertical
              navConfig={children}
              sx={{
                "& .MuiList-root:last-of-type .MuiListItemButton-root": {
                  height: 200,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  bgcolor: "background.neutral",
                  backgroundRepeat: "no-repeat",
                  backgroundImage:
                    "url(/assets/illustrations/illustration_dashboard.png)",
                  "& > *:not(.MuiTouchRipple-root)": { display: "none" },
                },
              }}
            />
          </Box>
        </Collapse>
      </>
    );
  }

  if (title === "Documentation") {
    return (
      <Link href={path} target="_blank" rel="noopener" underline="none">
        <ListItemStyle>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
        </ListItemStyle>
      </Link>
    );
  }

  return (
    <NextLink href={path} passHref>
      <ListItemStyle
        sx={{
          ...(isActive && {
            color: "primary.main",
            fontWeight: "fontWeightMedium",
            bgcolor: (theme: {
              palette: {
                primary: { main: string };
                action: { selectedOpacity: number };
              };
            }) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity
              ),
          }),
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    </NextLink>
  );
}
