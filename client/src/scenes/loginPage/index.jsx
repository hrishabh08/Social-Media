import { Box, Typography, useTheme, useMediaQuery, Grid } from "@mui/material";
import Form from "./Form";
import loginImage from "./loginPageImage.jpg";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={
          theme.palette.mode === "dark"
            ? theme.palette.background.alt
            : theme.palette.primary.main
        } //#3b5998
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color={"#FFFFF0"}>
          SocialHub
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "32%" : "70%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to SocialHub, Login to see what your friends are up to!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
