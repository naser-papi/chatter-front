import { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import InfiniteScroll from "react-infinite-scroller";
import { ChatsContext } from "@/contexts";
import { useAlert, useCallApi, useCallQuery } from "@/hooks";
import { MessageDto } from "@/dto/chat";
import { GET_MESSAGES } from "@/constants/graphql-query";
import { getErrorListFromAPIError } from "@/helpers/utils";
import { Loading, Message } from "@/components/molecule";
import { ChatPath, PAGE_COUNT } from "@/constants";

const MessageList = () => {
  const { currentChatId } = useContext(ChatsContext);
  const { showAlert } = useAlert();
  const [callRestAPI] = useCallApi();
  const [messageCount, setMessageCount] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const [messages, messagesError, messagesLoading, fetchMore] = useCallQuery<
    { messages: MessageDto[] },
    { chatId: string; skip: number; limit: number }
  >(
    GET_MESSAGES,
    {
      chatId: currentChatId || "",
      skip: 0,
      limit: PAGE_COUNT,
    },
    !currentChatId || messageCount === 0,
  );

  useEffect(() => {
    (async () => {
      if (currentChatId) {
        const apiInfo = ChatPath.getMessagesCount;
        apiInfo.params = { chatId: currentChatId };
        const resp = await callRestAPI<number>(apiInfo);
        if (resp) {
          setMessageCount(resp);
        }
      }
    })();
  }, [currentChatId]);
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

      {messages && (
        <InfiniteScroll
          pageStart={0}
          hasMore={messages.messages.length < messageCount}
          useWindow={false}
          loadMore={() =>
            fetchMore({ variables: { skip: messages!.messages.length } })
          }
        >
          {[...messages.messages]
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
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default MessageList;
