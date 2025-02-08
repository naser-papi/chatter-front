import { Divider, List, Toolbar } from "@mui/material";
import { AddChatButton, ChatList } from "@/components/organism/chat";
import { css } from "@emotion/css";
import clsx from "clsx";

const ChatBox = () => {
  return (
    <List
      component="aside"
      className={clsx(
        css`
          width: 100%;
          height: 100%;
          background: rgba(5, 1, 0, 0.99);
          display: grid;
          overflow-y: auto;
          grid-template-rows: 80px 2px auto;
        `,
        "scrollbar-dark",
      )}
    >
      <Toolbar className={"toolbar"}>
        <AddChatButton />
      </Toolbar>
      <Divider />
      <div
        className={css`
          max-height: calc(100% - 1px);
          overflow-y: auto;
        `}
      >
        <ChatList />
      </div>
    </List>
  );
};

export default ChatBox;
