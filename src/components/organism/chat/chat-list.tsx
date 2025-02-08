import { Fragment, useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ChatItem, Loading } from "@/components/molecule";
import { Divider } from "@mui/material";
import { ChatsContext } from "@/contexts";
import {
  useAlert,
  useCallApi,
  useCallQuery,
  useCallSubscription,
} from "@/hooks";
import { ChatListDto, MessageDto } from "@/dto/chat";
import { CHATS, ON_MESSAGE_CREATED } from "@/constants/graphql-query";
import { ChatPath } from "@/constants";
import { getErrorListFromAPIError } from "@/helpers/utils";
import EmptyBox from "@/components/molecule/empty-box";
import { updateMessagesCache } from "@/helpers/messages";
import { PAGE_COUNT } from "@/constants/base";

const ChatList = () => {
  const { onChatItemClick, currentChatId } = useContext(ChatsContext);
  const { showAlert } = useAlert();
  const [callRestAPI] = useCallApi();
  const [chatCount, setChatCount] = useState<number>(0);
  const [chatList, listError, listPending, fetchMore] = useCallQuery<
    ChatListDto,
    { skip: number; limit: number }
  >(CHATS, { skip: 0, limit: PAGE_COUNT }, chatCount === 0);

  const [] = useCallSubscription<
    { onMessageCreated: MessageDto },
    { chatIds: string[] }
  >(
    ON_MESSAGE_CREATED,
    {
      chatIds: chatList?.chats.map((chat) => chat.id!) || [],
    },
    false,
    ({ client, data }) => {
      if (data.data) {
        updateMessagesCache(client.cache, data.data.onMessageCreated);
      }
    },
  );
  useEffect(() => {
    if (listError) {
      const message = getErrorListFromAPIError(listError);
      showAlert(message, "error");
    }
  }, [listError]);
  useEffect(() => {
    (async () => {
      const apiInfo = ChatPath.getChatsCount;
      const resp = await callRestAPI<number | string>(apiInfo);
      if (resp) {
        console.log("count", resp);
        setChatCount(Number(resp));
      }
    })();
  }, []);

  return (
    <>
      <Loading show={listPending} />
      <EmptyBox show={!chatList || chatList.chats.length === 0} />
      {chatList?.chats?.length && (
        <InfiniteScroll
          pageStart={0}
          hasMore={chatCount > chatList!.chats.length}
          loadMore={() =>
            fetchMore({ variables: { skip: chatList!.chats.length } })
          }
          useWindow={false}
          loader={<Loading show={true} />}
        >
          {chatList!.chats.map((chat, index) => (
            <Fragment key={index}>
              <ChatItem
                onClick={() => onChatItemClick(chat.id!)}
                message={chat.lastMessage?.content || "-"}
                sender={chat.lastMessage?.user?.email.slice(0, 2) || "NP"}
                avatar={"NP"}
                title={chat.name || "title"}
                selected={currentChatId === chat.id}
              />
              <Divider variant="inset" />
            </Fragment>
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

export default ChatList;
