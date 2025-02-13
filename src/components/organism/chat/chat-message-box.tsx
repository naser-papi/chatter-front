import { useContext, useEffect, useState } from "react";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAlert, useCallMutation } from "@/hooks";
import { SEND_MESSAGE } from "@/constants/graphql-query";
import { MessageDto } from "@/dto/chat";
import { ChatsContext } from "@/contexts";
import { getErrorListFromAPIError } from "@/helpers/utils";
import { updateMessagesCache } from "@/helpers/messages";

interface ChatMessageBoxProps {
  text?: string;
}

const ChatMessageBox = ({ text = "" }: ChatMessageBoxProps) => {
  const { currentChatId } = useContext(ChatsContext);
  const { showAlert } = useAlert();
  const [message, setMessage] = useState(text);
  const [sendMessage, _, createError, createLoading] = useCallMutation<
    MessageDto,
    { data: MessageDto }
  >(SEND_MESSAGE, {
    update(cache, { data }) {
      if ((data as any)?.createMessage) {
        const newMessage: MessageDto = (data as any).createMessage;
        updateMessagesCache(cache, newMessage);
      }
    },
  });
  const onSendMessage = async () => {
    if (message && currentChatId) {
      await sendMessage({
        variables: { data: { content: message, chatId: currentChatId } },
      });
      setMessage("");
    } else {
      showAlert("Please enter message & select desired chat", "error");
    }
  };

  useEffect(() => {
    if (createError) {
      const message = getErrorListFromAPIError(createError);
      showAlert(message, "error");
    }
  }, [createError]);
  return (
    <Paper elevation={3} className={"chat-message-box"}>
      <InputBase
        className={"chat-message-text"}
        value={message}
        onKeyUp={(event) => event.key === "Enter" && onSendMessage()}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Divider orientation="vertical" />
      <IconButton
        onClick={onSendMessage}
        loading={createLoading}
        disabled={!message || createLoading}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatMessageBox;
