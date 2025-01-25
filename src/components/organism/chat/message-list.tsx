import { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { ChatsContext } from "@/contexts";
import { useAlert, useCallQuery, useCallSubscription } from "@/hooks";
import { MessageDto } from "@/dto/chat";
import { GET_MESSAGES, ON_MESSAGE_CREATED } from "@/constants/graphql-query";
import { getErrorListFromAPIError } from "@/helpers/utils";
import { Loading, Message } from "@/components/molecule";

const MessageList = () => {
  const { currentChatId } = useContext(ChatsContext);
  const { showAlert } = useAlert();
  const [newMessage] = useCallSubscription<
    { onMessageCreated: MessageDto },
    { chatId: string }
  >(ON_MESSAGE_CREATED, { chatId: currentChatId || "" });
  const listRef = useRef<HTMLDivElement>(null);
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
  const [messagesToShow, setMessagesToShow] = useState<MessageDto[]>([]);

  useEffect(() => {
    setMessagesToShow(messages?.messages || []);
  }, [messages?.messages]);

  useEffect(() => {
    if (
      newMessage &&
      messagesToShow.every((msg) => msg.id !== newMessage.onMessageCreated.id)
    ) {
      setMessagesToShow([...messagesToShow, newMessage.onMessageCreated]);
    }
  }, [newMessage]);
  useEffect(() => {
    if (messagesError) {
      const err = getErrorListFromAPIError(messagesError);
      showAlert(err, "error");
    }
  }, [messagesError]);
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messagesToShow, listRef.current]);
  if (!currentChatId) return null;
  return (
    <Box className={"message-list"} ref={listRef}>
      <Loading show={messagesLoading} />
      {[...messagesToShow]
        .sort(
          (msgA, msgB) =>
            new Date(msgA.createAt!).getTime() -
            new Date(msgB.createAt!).getTime(),
        )
        .map((msg) => (
          <Message
            key={msg.id}
            content={msg.content}
            createAt={msg.createAt}
            id={msg.id}
          />
        ))}
    </Box>
  );
};

export default MessageList;
