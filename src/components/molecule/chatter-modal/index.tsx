import ModalHeader from "./modal-header";
import { Backdrop, Card, Modal, Stack } from "@mui/material";
import { css } from "@emotion/css";
import ModalFooterActions from "./modal-footer-actions";

interface ChatterModalProps {
  open: boolean;
  title: string;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  onSubmit: () => Promise<void>;
  className?: string;
}

const ChatterModal = ({
  open,
  title,
  children,
  onClose,
  className,
  onSubmit,
}: ChatterModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      role={"chatter-modal"}
      className={className ?? "chatter-modal"}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Card
        variant="outlined"
        className={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 1rem;
        `}
        role={"chatter-modal-body"}
      >
        <ModalHeader title={title} onClose={onClose} />
        <Stack
          spacing={2}
          role={"chatter-modal-content"}
          className={css`
            padding: 0.5rem 0;
          `}
        >
          {children}
          <ModalFooterActions onSubmit={onSubmit} onCancel={onClose} />
        </Stack>
      </Card>
    </Modal>
  );
};

export default ChatterModal;
