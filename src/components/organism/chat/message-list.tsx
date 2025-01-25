import { useContext, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { ChatsContext } from "@/contexts";
import { useAlert, useCallQuery, useCallSubscription } from "@/hooks";
import { MessageDto } from "@/dto/chat";
import { GET_MESSAGES, ON_MESSAGE_CREATED } from "@/constants/graphql-query";
import { getErrorListFromAPIError } from "@/helpers/utils";
import { Loading, Message } from "@/components/molecule";
import { updateMessagesCache } from "@/helpers/messages";

const MessageList = () => {
  const { currentChatId } = useContext(ChatsContext);
  const { showAlert } = useAlert();
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

  const [] = useCallSubscription<
    { onMessageCreated: MessageDto },
    { chatId: string }
  >(
    ON_MESSAGE_CREATED,
    {
      chatId: currentChatId || "",
    },
    !currentChatId,
    ({ client, data }) => {
      if (data.data) {
        updateMessagesCache(client.cache, data.data.onMessageCreated);
      }
    },
  );

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
  }, [messages?.messages, listRef.current]);
  if (!currentChatId) return null;
  return (
    <Box className={"message-list"} ref={listRef}>
      <Loading show={messagesLoading} />

      {messages &&
        [...messages.messages]
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
