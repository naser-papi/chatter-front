import AppBar from "@/components/template/app-bar";
import HomeContent from "@/components/template/home-content";
import MainPageLayout from "@/components/template/main-page-layout";
import { ChatsProvider } from "@/contexts";

const HomePage = () => {
  return (
    <MainPageLayout>
      <AppBar />
      <ChatsProvider>
        <HomeContent />
      </ChatsProvider>
    </MainPageLayout>
  );
};

export default HomePage;
