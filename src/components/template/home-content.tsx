import { css } from "@emotion/css";
import { css as globalCss, Global } from "@emotion/react";
import { AddChatModal } from "@/components/organism/chat";
import ChatBox from "./chat-box";
import ChatContent from "./chat-content";

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
          }
          .scrollbar-dark {
            scrollbar-width: thin;
            scrollbar-color: #555 #202020;
          
            &::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
          
            &::-webkit-scrollbar-thumb {
              background-color: #555;
              border-radius: 4px;
            }
          
            &::-webkit-scrollbar-track {
              background-color: #202020;
            }
          }                      
        `}
      />
      <div
        className={css`
          display: grid;
          overflow: hidden;
          grid-template-columns: 1fr 3fr;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
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
