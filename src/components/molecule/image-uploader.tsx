import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

interface ImageUploaderProps {
  imageSelected: (file: File) => void;
}

const ImageUploader = ({ imageSelected }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setError(null);
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      if (img.width > 1024 || img.height > 1024) {
        setError("Image dimensions must be less than 1024x1024");
        URL.revokeObjectURL(objectUrl);
      } else {
        setPreview(objectUrl);
        imageSelected(file); // Call the callback function with the selected file
      }
    };

    img.onerror = () => {
      setError("Invalid image file");
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  return (
    <Stack direction="column" spacing={2} className={"image-uploader"}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {preview && <Avatar src={preview} alt="user avatar" />}
    </Stack>
  );
};

export default ImageUploader;
