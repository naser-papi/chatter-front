import { MouseEvent, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { UserPages } from "@/constants/base";
import { useAlert, useCallQuery } from "@/hooks";
import { ME } from "@/constants/graphql-query/auth";
import { UserDto } from "@/dto/auth";
import { getErrorListFromAPIError } from "@/helpers/utils";
import { css } from "@emotion/css";

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { showAlert } = useAlert();
  const [userInfo, getUserInfoError] = useCallQuery<{ me: UserDto }, {}>(ME);
  const navigate = useNavigate();
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (getUserInfoError) {
      const message = getErrorListFromAPIError(getUserInfoError);
      showAlert(message, "error");
    }
  }, [getUserInfoError]);

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={userInfo?.me.fullName}
            src={`${userInfo?.me.avatarUrl || "/static/images/avatar/2.jpg"}`}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Typography
          variant={"subtitle1"}
          borderBottom={1}
          gutterBottom
          className={css`
            padding: 8px;
          `}
        >
          {userInfo?.me.fullName}
        </Typography>
        {UserPages.map((page, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleCloseUserMenu();
              navigate(page.href);
            }}
          >
            <Typography sx={{ textAlign: "center" }}>{page.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserMenu;
