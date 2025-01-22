import { useContext, useEffect } from "react";
import { ChatsContext } from "@/contexts";
import { useAlert, useCallQuery } from "@/hooks";
import { MessageDto } from "@/dto/chat";
import { GET_MESSAGES } from "@/constants/graphql-query";
import { getErrorListFromAPIError } from "@/helpers/utils";
import { Loading } from "@/components/molecule";

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
    <div className={"message-list"}>
      <Loading show={messagesLoading} />
      {messages?.messages.map((msg) => <div key={msg.id}>{msg.content}</div>)}
    </div>
  );
};

export default MessageList;
