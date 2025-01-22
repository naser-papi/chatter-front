import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlert, useCallQuery } from "@/hooks";
import { ChatDto } from "@/dto/chat";
import { CHAT } from "@/constants/graphql-query";
import { EmptyBox, Loading } from "@/components/molecule";
import { getErrorListFromAPIError } from "@/helpers/utils";
import ChatMessageBox from "./chat-message-box";
import MessageList from "./message-list";

const ChatContentElements = () => {
  const { id: routeParamId } = useParams();
  const { showAlert } = useAlert();
  const [chatById, chatByIdError, chatByIdLoading] = useCallQuery<
    ChatDto,
    { id: string }
  >(CHAT, { id: routeParamId || "" }, !routeParamId);

  useEffect(() => {
    if (chatByIdError) {
      const message = getErrorListFromAPIError(chatByIdError);
      showAlert(message, "error");
    }
  }, [chatByIdError]);

  return (
    <>
      <Loading show={chatByIdLoading} />
      <EmptyBox
        show={!routeParamId}
        message={"Please Select a Chat form list"}
      />
      {chatById && (
        <>
          <header>
            <h2>{chatById.chat.name}</h2>
          </header>
          <MessageList />
          <ChatMessageBox />
        </>
      )}
    </>
  );
};

export default ChatContentElements;
