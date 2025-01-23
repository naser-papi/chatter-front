import { css } from "@emotion/css";
import clsx from "clsx";
import { ChatContentElements } from "@/components/organism/chat";

const ChatContent = () => {
  return (
    <div
      className={clsx(
        css`
          height: calc(100% - 1px);
          padding: 1rem 1rem 60px;
          position: relative;
          overflow: hidden;

          .message-list {
            display: flex;
            flex-flow: column;
            row-gap: 12px;
            box-sizing: border-box;
            max-height: calc(100% - 80px);
            overflow-y: auto;
            height: 100%;
            position: relative;
            padding-bottom: 1rem;
          }

          .chat-message-box {
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 0.5rem;
            z-index: 10;
            width: 100%;
            display: flex;
            align-items: center;

            .chat-message-text {
              width: 100%;
            }
          }
        `,
        "scrollbar-dark",
      )}
    >
      <ChatContentElements />
    </div>
  );
};

export default ChatContent;
