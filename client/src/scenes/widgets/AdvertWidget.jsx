import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:5000/assets/Advertisement.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>KFC</Typography>
        <Typography color={medium}>kentuckyfriedchicken.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        KFC started by Colonel Sanders in Corbin, Kentucky in 1952. They are now
        all over the world. They not only sell chicken, but also other food like
        salads and french fries.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
