import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { ChatsContext } from "@/contexts";
import { useAlert, useCallQuery } from "@/hooks";
import { MessageDto } from "@/dto/chat";
import { GET_MESSAGES } from "@/constants/graphql-query";
import { getErrorListFromAPIError } from "@/helpers/utils";
import { Loading, Message } from "@/components/molecule";

const MessageList = () => {
  const { currentChatId } = useContext(ChatsContext);
  const { showAlert } = useAlert();
  const [messages, messagesError, messagesLoading] = useCallQuery<
    { messages: MessageDto[] },
    { chatId: string }
  >(
    GET_MESSAGES,
    {
      chatId: currentChatId || "",
    },
    !currentChatId,
  );
  useEffect(() => {
    if (messagesError) {
      const err = getErrorListFromAPIError(messagesError);
      showAlert(err, "error");
    }
  }, [messagesError]);
  if (!currentChatId) return null;
  return (
    <Box className={"message-list"}>
      <Loading show={messagesLoading} />
      {messages?.messages.map((msg) => (
        <Message
          key={msg.id}
          content={msg.content}
          createdAt={msg.createdAt}
          id={msg.id}
        />
      ))}
    </Box>
  );
};

export default MessageList;
