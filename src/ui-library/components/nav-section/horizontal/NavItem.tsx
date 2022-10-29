import { forwardRef } from "react";
// @mui
import {
  Box,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
// config
import { ICON } from "../../../config";
//
import { ListItemStyle } from "./style";
import { NavItemProps } from "../type";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// ----------------------------------------------------------------------

type Props = NavItemProps & ListItemButtonProps;

const NavItem = forwardRef<HTMLDivElement & HTMLAnchorElement, Props>(
  function NavItem({ item, depth, active, open, ...other }, ref) {
    const { title, icon, info, children, disabled, caption } = item;

    const renderContent = (
      <ListItemStyle
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      >
        {icon && (
          <ListItemIcon
            sx={{
              mr: 1,
              flexShrink: 0,
              width: ICON.NAVBAR_ITEM_HORIZONTAL,
              height: ICON.NAVBAR_ITEM_HORIZONTAL,
            }}
          >
            {icon}
          </ListItemIcon>
        )}

        <ListItemText
          primary={title}
          primaryTypographyProps={{
            noWrap: true,
            variant: active ? "subtitle2" : "body2",
          }}
        />

        {caption && (
          <Tooltip title={caption} arrow>
            <Box component="span" sx={{ ml: 0.5, lineHeight: 0 }}>
              <HelpOutlineIcon
                sx={{
                  width: ICON.NAVBAR_ITEM_HORIZONTAL / -4,
                  height: ICON.NAVBAR_ITEM_HORIZONTAL / -4,
                }}
              />
            </Box>
          </Tooltip>
        )}

        {info && (
          <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
            {info}
          </Box>
        )}

        {!!children &&
          (depth > 1 ? (
            <KeyboardArrowDownIcon
              sx={{
                ml: 0.5,
                flexShrink: 0,
                width: ICON.NAVBAR_ITEM_HORIZONTAL,
                height: ICON.NAVBAR_ITEM_HORIZONTAL,
              }}
            />
          ) : (
            <KeyboardArrowRightIcon
              sx={{
                ml: 0.5,
                flexShrink: 0,
                width: ICON.NAVBAR_ITEM_HORIZONTAL,
                height: ICON.NAVBAR_ITEM_HORIZONTAL,
              }}
            />
          ))}
      </ListItemStyle>
    );

    return renderContent;
  }
);

export default NavItem;
