import { Divider, List, Toolbar } from "@mui/material";
import { AddChatButton, ChatList } from "@/components/organism/chat";
import { css } from "@emotion/css";

const ChatBox = () => {
  return (
    <List
      className={css`
        width: 100%;
        height: 100%;
        background: rgba(5, 1, 0, 0.99);
      `}
    >
      <Toolbar>
        <AddChatButton />
      </Toolbar>
      <Divider />
      <ChatList />
    </List>
  );
};

export default ChatBox;
