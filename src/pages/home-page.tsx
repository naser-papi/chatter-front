import { useCallQuery } from "@/hooks";
import { ME } from "@/constants/graphql-query";
import { CreateUserDto } from "@/dto/auth.ts";
import AppBar from "@/components/template/app-bar";

const HomePage = () => {
  const [data, _, loading] = useCallQuery<CreateUserDto>(ME);
  return (
    <div>
      <AppBar />
      {loading && "loading..."}
      {data?.email}
    </div>
  );
};

export default HomePage;
