import { useContext, useEffect, useState } from "react";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { SearchBox } from "@/components/molecule";
import ChatterModal from "@/components/molecule/chatter-modal";
import { ChatsContext } from "@/contexts";
import { useAlert, useCallMutation } from "@/hooks";
import { ChatItemDto, CreateChatDto } from "@/dto/chat";
import { CHATS, CREATE_CHAT } from "@/constants/graphql-query";
import { getErrorListFromAPIError } from "@/helpers/utils";

const AddChatModal = () => {
  const { showAddModal, onCancelNewChat } = useContext(ChatsContext);

  const [createChat, createdChat, createError] = useCallMutation<
    CreateChatDto,
    { data: ChatItemDto }
  >(CREATE_CHAT, {
    update(cache, { data }) {
      if (data?.createChat) {
        const newChat = {
          ...data.createChat,
        };

        // Read the existing chats from the cache
        const existingChats: any = cache.readQuery({
          query: CHATS,
        });

        // Update the cache with the new chat
        cache.writeQuery({
          query: CHATS,
          data: {
            ...existingChats,
            chats: [newChat, ...existingChats.chats], // Prepend or append as needed
          },
        });
      }
    },
  });

  const { showAlert } = useAlert();

  const [newDto, setNewDto] = useState<ChatItemDto>({
    isPrivate: false,
    name: "",
    userIds: [],
  });

  useEffect(() => {
    if (createError) {
      const message = getErrorListFromAPIError(createError);
      showAlert(message, "error");
    }
  }, [createError]);

  useEffect(() => {
    if (createdChat) {
      //setList([createdChat.createChat, ...list]);
      onCancelNewChat();
    }
  }, [createdChat]);

  const onSubmitNewChat = async () => {
    if (!newDto.name) {
      showAlert("Please enter chat name", "error");
      return;
    }
    await createChat({
      variables: { data: { ...newDto } },
    });
  };

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
        <SearchBox placeholder={"Find Friend"} onSearch={() => {}} />
      </form>
    </ChatterModal>
  );
};

export default AddChatModal;
