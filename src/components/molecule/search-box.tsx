import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface SearchBoxProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

const SearchBox = ({ placeholder, onSearch }: SearchBoxProps) => {
  const [text, setText] = useState("");
  return (
    <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">
        {placeholder}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={"text"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={placeholder}
              onClick={() => onSearch(text)}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
};

export default SearchBox;
