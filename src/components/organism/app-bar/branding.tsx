import ChatIcon from "@mui/icons-material/Chat";
import Typography from "@mui/material/Typography";

const Branding = () => {
  return (
    <>
      <ChatIcon className="branding-icon" />
      <Typography
        className={"brand-name"}
        variant="h6"
        noWrap
        component="a"
        href="/"
      >
        CHATTER
      </Typography>
    </>
  );
};

export default Branding;
