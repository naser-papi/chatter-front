import { useEffect } from "react";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAlert, useCallQuery } from "@/hooks";
import { ChatDto } from "@/dto/chat";
import { CHAT } from "@/constants/graphql-query";
import { EmptyBox, Loading } from "@/components/molecule";
import { getErrorListFromAPIError } from "@/helpers/utils";
import ChatMessageBox from "./chat-message-box";

const ChatContent = () => {
  const { id: routeParamId } = useParams();
  const { showAlert } = useAlert();
  const [chatById, chatByIdError, chatByIdPending] = useCallQuery<
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
    <Stack className={"chat-content"}>
      <Loading show={chatByIdPending} />
      <EmptyBox
        show={!routeParamId}
        message={"Please Select a Chat form list"}
      />
      {chatById && (
        <>
          <h2>{chatById.chat.name}</h2>
          <ChatMessageBox />
        </>
      )}
    </Stack>
  );
};

export default ChatContent;
