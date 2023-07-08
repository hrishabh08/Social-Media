import { Box } from "@mui/material";
import { styled } from "@mui/system";

//another way of using a css based react component
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
