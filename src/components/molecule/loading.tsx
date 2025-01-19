import CircularProgress from "@mui/material/CircularProgress";

interface LoadingProps {
  show: boolean;
}

const Loading = ({ show }: LoadingProps) => {
  if (!show) return null;
  return <CircularProgress />;
};

export default Loading;
