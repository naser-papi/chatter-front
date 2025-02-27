import { useContext } from "react";
import { TextField } from "@mui/material";
import { ProfileContext } from "@/contexts";
import { ImageUploader } from "@/components/molecule";

const ProfileFormBody = () => {
  const { setData, data } = useContext(ProfileContext);
  return (
    <div className={"profile-form-body"}>
      <TextField
        type={"text"}
        name={"fullName"}
        label={"Full Name"}
        variant={"outlined"}
        onChange={(e) => setData({ ...data, fullName: e.target.value })}
      />
      <ImageUploader
        imageSelected={(file) => setData({ ...data, avatarImage: file })}
      />
    </div>
  );
};

export default ProfileFormBody;
