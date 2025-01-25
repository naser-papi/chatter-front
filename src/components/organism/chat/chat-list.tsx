import { Fragment, useContext, useEffect } from "react";
import { ChatItem, Loading } from "@/components/molecule";
import { Divider } from "@mui/material";
import { ChatsContext } from "@/contexts";
import { useAlert, useCallQuery } from "@/hooks";
import { ChatListDto } from "@/dto/chat";
import { CHATS } from "@/constants/graphql-query";
import { getErrorListFromAPIError } from "@/helpers/utils";
import EmptyBox from "@/components/molecule/empty-box";

const ChatList = () => {
  const { onChatItemClick, currentChatId } = useContext(ChatsContext);
  const [chatList, listError, listPending] = useCallQuery<ChatListDto, {}>(
    CHATS,
  );
  const { showAlert } = useAlert();
  useEffect(() => {
    if (listError) {
      const message = getErrorListFromAPIError(listError);
      showAlert(message, "error");
    }
  }, [listError]);
  return (
    <>
      <Loading show={listPending} />
      <EmptyBox show={!chatList || chatList.chats.length === 0} />
      {chatList?.chats
        .map((chat) => (
          <Fragment key={chat.id}>
            <ChatItem
              onClick={() => onChatItemClick(chat.id!)}
              message={"msg"}
              sender={"sender"}
              avatar={"NP"}
              title={chat.name || "title"}
              selected={currentChatId === chat.id}
            />
            <Divider variant="inset" component="li" />
          </Fragment>
        ))
        ?.reverse()}
    </>
  );
};

export default ChatList;
