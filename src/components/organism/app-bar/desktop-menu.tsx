import Button from "@mui/material/Button";
import { Pages } from "@/constants/base";

const DesktopMenu = () => {
  const handleCloseNavMenu = () => {
    // setAnchorElNav(null);
  };

  return (
    <>
      {Pages.map((page, index) => (
        <Button key={index} onClick={handleCloseNavMenu}>
          {page.title}
        </Button>
      ))}
    </>
  );
};

export default DesktopMenu;
