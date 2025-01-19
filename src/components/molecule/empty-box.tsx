import { Box, Typography } from "@mui/material";

interface EmptyBoxProps {
  show: boolean;
  message?: string;
}

const EmptyBox = ({ show, message = "No data available" }: EmptyBoxProps) => {
  if (!show) return null;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      p={2}
      border="1px dashed gray"
      borderRadius="8px"
    >
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyBox;
