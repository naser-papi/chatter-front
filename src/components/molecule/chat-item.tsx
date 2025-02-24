import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ListItemButton } from "@mui/material";

interface ChatItemProps {
  message: string | null;
  sender: string;
  avatar: string;
  title: string;
  onClick: () => void;
  time?: string;
  selected?: boolean;
}

const ChatItem = ({
  message,
  sender,
  avatar,
  title,
  onClick,
  selected,
}: ChatItemProps) => {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton onClick={onClick} selected={selected}>
          <ListItemAvatar>
            <Avatar alt={sender} src={avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={title}
            secondary={
              message ? (
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: "text.primary", display: "inline" }}
                  >
                    {sender + ": "}
                  </Typography>
                  {message}
                </>
              ) : null
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default ChatItem;
