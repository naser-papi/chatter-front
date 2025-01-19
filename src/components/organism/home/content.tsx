import { useCallQuery } from "@/hooks";
import { ME } from "@/constants/graphql-query";

const Content = () => {
  const [data, _, loading] = useCallQuery<{
    me: { email: string; id: string };
  }>(ME);
  return (
    <div>
      {loading && "loading..."}
      {data?.me.email}
    </div>
  );
};

export default Content;
