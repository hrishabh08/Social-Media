import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Drawer,
  Divider,
  List,
  easing,
  Slide,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Directions,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;

  const maincolor = theme.palette.primary.main;
  const alt = theme.palette.background.alt; //white
  let fullName = "name";
  fullName = `Hi ${user.firstName}`;
  const container = document.body;

  //ADDING THE DRAWER COMPONENT
  const drawer = (
    <Box
      onClick={() => {
        setIsMobileMenuToggled(!isMobileMenuToggled);
      }}
      sx={{ textAlign: "center" }}
    >
      <FlexBetween
        marginTop={3}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="3rem"
      >
        <IconButton
          onClick={() => dispatch(setMode())}
          sx={{ fontSize: "25px" }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>
        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <FormControl variant="standard" value={fullName}>
          <Select
            value={fullName}
            sx={{
              backgroundColor: neutralLight,
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem",
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: neutralLight,
              },
            }}
            input={<InputBase />}
          >
            <MenuItem value={fullName}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(setLogout());
                navigate("/");
              }}
            >
              Log Out
            </MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
    </Box>
  );

  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={theme.palette.mode === "light" ? maincolor : alt}
    >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="#FFFFF0"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          SocialHub
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="10rem"
            marginLeft="7.1rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: "#FFFFF0", fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ color: "#FFFFF0", fontSize: "25px" }} />
          <Notifications sx={{ color: "#FFFFF0", fontSize: "25px" }} />

          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setLogout());
                  navigate("/");
                }}
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="400px"
          minWidth="200px"
          backgroundColor={alt}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            ></IconButton>
          </Box>

          <Drawer
            variant="temporary"
            open={isMobileMenuToggled && !isNonMobileScreens}
            transitionDuration={{
              enter: theme.transitions.duration.enteringScreen,
              exit: theme.transitions.duration.leavingScreen,
            }}
            onClose={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            container={container}
            anchor="right"
            SlideProps={Slide}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 200 },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
