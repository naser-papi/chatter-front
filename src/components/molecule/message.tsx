import { MessageDto } from "@/dto/chat";
import Grid from "@mui/material/Grid2";

import Avatar from "@mui/material/Avatar";
import { Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

interface MessageProps
  extends Pick<MessageDto, "id" | "content" | "createdAt"> {}

const Message = ({ content, createdAt }: MessageProps) => {
  return (
    <Grid container spacing={2}>
      <Grid size={1}>
        <Avatar src={""} sx={{ width: 42, height: 42 }} />
      </Grid>
      <Grid size={11}>
        <Stack>
          <Paper sx={{ width: "fit-content" }}>
            <Typography sx={{ padding: "0.9rem" }}>{content}</Typography>
          </Paper>
          <Typography variant={"caption"}>
            {createdAt?.toLocaleString()}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Message;
