import { useCallQuery } from "@/hooks";
import { ME } from "@/constants/graphql-query";
import { CreateUserDto } from "@/dto/auth.ts";

const HomePage = () => {
  const [data, _, loading] = useCallQuery<CreateUserDto>(ME);
  return (
    <div>
      {loading && "loading..."}
      {data?.email}
    </div>
  );
};

export default HomePage;
