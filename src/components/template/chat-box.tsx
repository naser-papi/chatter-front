import { Divider, List, Toolbar } from "@mui/material";
import { AddChatButton, ChatList } from "@/components/organism/chat";
import { css } from "@emotion/css";
import clsx from "clsx";

const ChatBox = () => {
  return (
    <List
      className={clsx(
        css`
          width: 100%;
          height: 100%;
          background: rgba(5, 1, 0, 0.99);
          max-height: calc(100% - 1px);
          overflow-y: auto;
        `,
        "scrollbar-dark",
      )}
    >
      <Toolbar className={"toolbar"}>
        <AddChatButton />
      </Toolbar>
      <Divider />
      <ChatList />
    </List>
  );
};

export default ChatBox;
