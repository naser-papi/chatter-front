import { useContext } from "react";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { SearchBox } from "@/components/molecule";
import ChatterModal from "@/components/molecule/chatter-modal";
import { ChatsContext } from "@/contexts";

const AddChatModal = () => {
  const { showAddModal, onCancelNewChat, onSubmitNewChat, newDto, setNewDto } =
    useContext(ChatsContext);

  return (
    <ChatterModal
      open={showAddModal}
      title={"Add Chat"}
      onClose={onCancelNewChat}
      onSubmit={onSubmitNewChat}
      className={"add-chat-modal"}
    >
      <form className={"add-chat-form"}>
        <FormControlLabel
          value={newDto.isPrivate}
          label={"Private"}
          control={<Switch />}
          onChange={(event: any) =>
            setNewDto({
              ...newDto,
              isPrivate: event.target.checked,
            })
          }
        ></FormControlLabel>
        <TextField
          label="Name"
          variant="outlined"
          required
          sx={{ m: 1 }}
          onChange={(e) => setNewDto({ ...newDto, name: e.target.value })}
        />
        <SearchBox placeholder={"Find Friend"} onSearch={(text) => {}} />
      </form>
    </ChatterModal>
  );
};

export default AddChatModal;
