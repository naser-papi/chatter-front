import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatDto, ChatItemDto, ChatListDto, CreateChatDto } from "@/dto/chat";
import { useAlert, useCallMutation, useCallQuery } from "@/hooks";
import { CHAT, CHATS, CREATE_CHAT } from "@/constants/graphql-query";
import { getErrorListFromAPIError } from "@/helpers/utils";

interface ChatsContextProps {
  list: ChatItemDto[];
  showAddModal: boolean;
  newDto: ChatItemDto;
  setNewDto: (dto: ChatItemDto) => void;
  onShowAddModal: () => void;
  onSubmitNewChat: () => void;
  onCancelNewChat: () => void;
  onChatItemClick: (id: string) => void;
  currentChat: ChatItemDto | null;
  apiLoading: boolean;
}

interface ChatsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const ChatsContext = createContext<ChatsContextProps>(
  {} as ChatsContextProps,
);

export const ChatsProvider = ({ children }: ChatsProviderProps) => {
  const [createChat, createdChat, createError, createPending] = useCallMutation<
    CreateChatDto,
    { data: ChatItemDto }
  >(CREATE_CHAT);

  const [chatList, listError, listPending] = useCallQuery<ChatListDto>(CHATS);
  const [chatById, chatByIdError, chatByIdPending] =
    useCallQuery<ChatDto>(CHAT);
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { id: routeParamId } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentChat, setCurrentChat] = useState<ChatItemDto | null>(null);
  const [list, setList] = useState<ChatItemDto[]>([]);
  const [newDto, setNewDto] = useState<ChatItemDto>({
    isPrivate: false,
    name: "",
    userIds: [],
  });

  useEffect(() => {
    (async () => {
      if (routeParamId) {
        await chatById({ variables: { id: routeParamId } });
      } else {
        setCurrentChat(null);
      }
    })();
  }, [routeParamId]);

  useEffect(() => {
    if (createError) {
      const message = getErrorListFromAPIError(createError);
      showAlert(message, "error");
    }
  }, [createError]);

  useEffect(() => {
    if (listError) {
      const message = getErrorListFromAPIError(listError);
      showAlert(message, "error");
    }
  }, [listError]);
  useEffect(() => {
    if (chatList) {
      setList(chatList.chats);
      return;
    }
    setList([]);
  }, [chatList]);

  useEffect(() => {
    if (createdChat) {
      setList([createdChat.createChat, ...list]);
      onCancelNewChat();
    }
  }, [createdChat]);

  const onShowAddModal = useCallback(async () => {
    setShowAddModal(true);
  }, []);
  const onCancelNewChat = useCallback(() => {
    setShowAddModal(false);
  }, []);

  const onChatItemClick = useCallback((id: string) => {
    navigate(`/chats/${id}`);
  }, []);

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
    <ChatsContext.Provider
      value={{
        showAddModal,
        list,
        newDto,
        onShowAddModal,
        onCancelNewChat,
        onSubmitNewChat,
        onChatItemClick,
        currentChat,
        apiLoading: createPending || listPending,
        setNewDto,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
