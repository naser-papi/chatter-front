import { createContext, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateChatDto } from "@/dto/chat";

interface ChatsContextProps {
  showAddModal: boolean;
  onShowAddModal: () => void;
  onCancelNewChat: () => void;
  onChatItemClick: (id: string) => void;
  onNewChatCreated: (newChat: CreateChatDto) => void;
  currentChatId: string | null;
}

interface ChatsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const ChatsContext = createContext<ChatsContextProps>(
  {} as ChatsContextProps,
);

export const ChatsProvider = ({ children }: ChatsProviderProps) => {
  const navigate = useNavigate();
  const { id: chatIdParam } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(
    chatIdParam as string,
  );

  const onShowAddModal = useCallback(async () => {
    setShowAddModal(true);
  }, []);
  const onCancelNewChat = useCallback(() => {
    setShowAddModal(false);
  }, []);

  const onNewChatCreated = (newChat: CreateChatDto) => {
    onCancelNewChat();
    setCurrentChatId(newChat.createChat.id!);
    navigate(`/chats/${newChat.createChat.id}`);
  };

  const onChatItemClick = useCallback((id: string) => {
    setCurrentChatId(id);
    navigate(`/chats/${id}`);
  }, []);
  return (
    <ChatsContext.Provider
      value={{
        showAddModal,
        onShowAddModal,
        onCancelNewChat,
        onChatItemClick,
        currentChatId,
        onNewChatCreated,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
