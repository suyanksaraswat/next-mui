// @mui
import { Box, ListItemButtonProps, Tooltip } from "@mui/material";
//
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
//
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from "./style";
import { NavItemProps } from "../type";

// ----------------------------------------------------------------------

type Props = NavItemProps & ListItemButtonProps;

export default function NavItem({
  item,
  depth,
  active,
  open,
  isCollapse,
  ...other
}: Props) {
  const { title, icon, info, children, disabled, caption, roles } = item;

  const renderContent = (
    <ListItemStyle depth={depth} active={active} disabled={disabled} {...other}>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}

      {depth !== 1 && <DotIcon active={active && depth !== 1} />}

      <ListItemTextStyle
        isCollapse={isCollapse}
        primary={title}
        secondary={
          caption && (
            <Tooltip title={caption} placement="top-start">
              <span>{caption}</span>
            </Tooltip>
          )
        }
        primaryTypographyProps={{
          noWrap: true,
          variant: active ? "subtitle2" : "body2",
        }}
        secondaryTypographyProps={{
          noWrap: true,
          variant: "caption",
        }}
      />

      {!isCollapse && (
        <>
          {info && (
            <Box component="span" sx={{ lineHeight: 0 }}>
              {info}
            </Box>
          )}

          {!!children &&
            (open ? (
              <KeyboardArrowDownIcon
                sx={{ width: 16, height: 16, ml: 1, flexShrink: 0 }}
              />
            ) : (
              <KeyboardArrowRightIcon
                sx={{ width: 16, height: 16, ml: 1, flexShrink: 0 }}
              />
            ))}
        </>
      )}
    </ListItemStyle>
  );

  return renderContent;
}

// ----------------------------------------------------------------------

type DotIconProps = {
  active: boolean;
};

export function DotIcon({ active }: DotIconProps) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "text.disabled",
          transition: (theme) =>
            theme.transitions.create("transform", {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: "scale(2)",
            bgcolor: "primary.main",
          }),
        }}
      />
    </ListItemIconStyle>
  );
}
