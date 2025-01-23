import { useContext, useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement | null>(null); // Reference to the message list container
  const lastMessageRef = useRef<HTMLDivElement | null>(null); // Reference to the last message
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

  useEffect(() => {
    // Scroll to the last message when messages change
    if (messages?.messages.length && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages?.messages]);

  if (!currentChatId) return null;
  return (
    <Box className={"message-list"} ref={containerRef}>
      <Loading show={messagesLoading} />
      {messages?.messages.map((msg, index) => {
        const isLastMessage = index === messages.messages.length - 1;
        return (
          <Message
            key={msg.id}
            content={msg.content}
            createAt={msg.createAt}
            id={msg.id}
            ref={isLastMessage ? lastMessageRef : null} // Attach lastMessageRef to the last message
          />
        );
      })}
    </Box>
  );
};

export default MessageList;
