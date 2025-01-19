import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ChatsContext } from "@/contexts";

const AddChatButton = () => {
  const { onShowAddModal } = useContext(ChatsContext);
  return (
    <IconButton size={"large"} edge={"start"} onClick={onShowAddModal}>
      <AddCircleIcon />
    </IconButton>
  );
};

export default AddChatButton;
