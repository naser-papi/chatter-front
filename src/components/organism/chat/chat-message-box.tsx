import { useState } from "react";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatMessageBoxProps {
  text?: string;
}

const ChatMessageBox = ({ text = "" }: ChatMessageBoxProps) => {
  const [message, setMessage] = useState(text);

  return (
    <Paper elevation={3} className={"chat-message-box"}>
      <InputBase
        className={"chat-message-text"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Divider orientation="vertical" />
      <IconButton>
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatMessageBox;
