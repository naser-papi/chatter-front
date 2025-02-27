import { useContext } from "react";
import { ProfileContext } from "@/contexts";
import { Button, Link } from "@mui/material";

const ProfileFormActions = () => {
  const { saveData, onCancel } = useContext(ProfileContext);
  return (
    <div className={"profile-form-actions"}>
      <Link component="button" variant="body2" onClick={onCancel} type="button">
        Back
      </Link>
      <Button onClick={saveData} variant={"contained"} type="button">
        Save
      </Button>
    </div>
  );
};

export default ProfileFormActions;
