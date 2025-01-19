import { useContext } from "react";
import { ChatsContext } from "@/contexts";

const ChatContent = () => {
  const { currentChat } = useContext(ChatsContext);
  if (!currentChat) return null;
  return <h3>{currentChat.name}</h3>;
};

export default ChatContent;
