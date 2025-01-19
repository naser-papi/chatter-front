import { makeVar } from "@apollo/client";
import { IChatListState } from "@/types/state-management.ts";

const ChatListState = makeVar<IChatListState>({
  isPrivate: false,
  showAddModal: false,
});

export default ChatListState;
