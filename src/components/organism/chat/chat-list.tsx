import { useContext } from "react";
import { ChatItem } from "@/components/molecule";
import { Divider } from "@mui/material";
import { ChatsContext } from "@/contexts";

const ChatList = () => {
  const { list, onChatItemClick } = useContext(ChatsContext);
  return (
    <>
      {list.map((chat) => (
        <>
          <ChatItem
            key={chat.id}
            onClick={() => onChatItemClick(chat.id!)}
            message={"msg"}
            sender={"sender"}
            avatar={"NP"}
            title={chat.name || "title"}
          />
          <Divider variant="inset" component="li" />
        </>
      ))}
    </>
  );
};

export default ChatList;
