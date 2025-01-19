import { css } from "@emotion/css";
import { Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <>
      <header
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 4px;
        `}
      >
        <Typography variant={"h5"}>{title}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </header>
      <Divider />
    </>
  );
};

export default ModalHeader;
