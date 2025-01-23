import { MessageDto } from "@/dto/chat";
import Grid from "@mui/material/Grid2";
import { forwardRef } from "react";
import Avatar from "@mui/material/Avatar";
import { Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { formatMessageDateTime } from "@/helpers/utils";

interface MessageProps
  extends Pick<MessageDto, "id" | "content" | "createAt"> {}

const Message = forwardRef(({ content, createAt }: MessageProps, ref) => {
  return (
    <Grid container spacing={2} ref={ref}>
      <Grid size={1}>
        <Avatar src={""} sx={{ width: 42, height: 42 }} />
      </Grid>
      <Grid size={11}>
        <Stack>
          <Paper sx={{ width: "fit-content" }}>
            <Typography sx={{ padding: "0.9rem" }}>{content}</Typography>
          </Paper>
          <Typography variant={"caption"}>
            {formatMessageDateTime(createAt)}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
});

export default Message;
