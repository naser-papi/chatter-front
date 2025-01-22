import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChatsContextProps {
  showAddModal: boolean;
  onShowAddModal: () => void;
  onCancelNewChat: () => void;
  onChatItemClick: (id: string) => void;
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const onShowAddModal = useCallback(async () => {
    setShowAddModal(true);
  }, []);
  const onCancelNewChat = useCallback(() => {
    setShowAddModal(false);
  }, []);

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
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
