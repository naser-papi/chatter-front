import { useAlert, useCallQuery } from "@/hooks";
import { ChatDto } from "@/dto/chat";
import { CHAT } from "@/constants/graphql-query";
import { useParams } from "react-router-dom";
import { Loading } from "@/components/molecule";
import EmptyBox from "@/components/molecule/empty-box";
import { useEffect } from "react";
import { getErrorListFromAPIError } from "@/helpers/utils";

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
    <>
      <Loading show={chatByIdPending} />
      <EmptyBox
        show={!routeParamId}
        message={"Please Select a Chat form list"}
      />
      {chatById && <div>{JSON.stringify(chatById)}</div>}
    </>
  );
};

export default ChatContent;
