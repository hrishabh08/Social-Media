import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setnotFriends } from "state";

const NotFriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const notFriends = useSelector((state) => state.user.notFriends);

  const getNotFriends = async () => {
    const response = await fetch(
      `http://localhost:5000/user/${userId}/NOTfriends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setnotFriends({ notFriends: data }));
  };

  useEffect(() => {
    getNotFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        People You may Know
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {notFriends.map((nfriend) => (
          <Friend
            key={nfriend._id}
            friendId={nfriend._id}
            name={`${nfriend.firstName} ${nfriend.lastName}`}
            subtitle={nfriend.occupation}
            userPicturePath={nfriend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default NotFriendList;
