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
          grid-template-columns: 1fr 3fr;
          overflow: hidden;
          width: 100%;
          align-items: start;
          background: #202020;
          container-type: inline-size;
          container-name: home-content;

          .chat-content {
            height: 100%;
            padding: 1rem;

            .chat-message-box {
              margin-top: auto;
              padding: 0.5rem;
              width: 100%;
              display: flex;
              align-items: center;

              .chat-message-text {
                width: 100%;
              }
            }
          }
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
