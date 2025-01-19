import { css } from "@emotion/css";
import { css as globalCss, Global } from "@emotion/react";
import { AddChatModal, ChatContent } from "@/components/organism/chat";
import ChatBox from "./chat-box";

const HomeContent = () => {
  return (
    <>
      <Global
        styles={globalCss`
          .add-chat-modal {          
            [role="chatter-modal-body"] {            
              width:480px;                                                             
          }          
          .add-chat-form{
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
        `}
      />
      <div
        className={css`
          display: grid;
          grid-template-columns: 1fr 3fr;
          width: 100%;
          align-items: start;
          background: #202020;
          container-type: inline-size;
          container-name: home-content;
        `}
      >
        <ChatBox />
        <ChatContent />
        <AddChatModal />
      </div>
    </>
  );
};

export default HomeContent;
