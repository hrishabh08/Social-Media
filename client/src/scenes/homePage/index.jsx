import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import NotFriendList from "scenes/widgets/NotFriendList";

import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width :1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
      >
        <Box flexBasis={isNonMobileScreens ? "22%" : null}>
          <UserWidget userId={_id} picturePath={picturePath} />
          <Box m="2rem 0" />
          <NotFriendList userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "48%" : undefined}
          mt={isNonMobileScreens ? null : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />

            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
