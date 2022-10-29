// components
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: "Home",
    icon: <HomeIcon {...ICON_SIZE} />,
    path: "/",
  },
  {
    title: "About us",
    icon: <InfoIcon {...ICON_SIZE} />,
    path: "/about-us",
  },
  {
    title: "Team",
    icon: <PeopleIcon {...ICON_SIZE} />,
    path: "/team",
  },
];

export default menuConfig;
