import { Button, Divider, Stack } from "@mui/material";
import { css } from "@emotion/css";
import { useState } from "react";

interface ModalFooterActionsProps {
  onSubmit: () => Promise<void>;
  onCancel: () => void;
}

const ModalFooterActions = ({
  onSubmit,
  onCancel,
}: ModalFooterActionsProps) => {
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(false);
  };
  return (
    <Stack
      spacing={1}
      className={css`
        padding-top: 1.5rem;
      `}
    >
      <Divider />
      <Stack
        direction="row"
        justifyContent="justify-between"
        alignItems="center"
        className={css`
          display: flex;
          gap: 2px;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <Button
          color={"success"}
          variant={"outlined"}
          onClick={onSubmitHandler}
          loadingPosition={"end"}
          loading={loading}
        >
          Submit
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Stack>
    </Stack>
  );
};

export default ModalFooterActions;
