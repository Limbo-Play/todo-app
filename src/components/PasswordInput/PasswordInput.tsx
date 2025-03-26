import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import OpenIcon from "@mui/icons-material/VisibilityOutlined";
import ClosedIcon from "@mui/icons-material/VisibilityOffOutlined";

type TCustomInput = {
  register: UseFormRegister<any>;
  name: string;
} & TextFieldProps;

const PasswordInput = ({ name, register, ...rest }: TCustomInput) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      {...rest}
      {...register(name)}
      name={name}
      autoComplete="none"
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <OpenIcon /> : <ClosedIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default PasswordInput;
