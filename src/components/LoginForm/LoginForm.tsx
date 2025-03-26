import { Button, Stack, Typography } from "@mui/material";
import CustomInput from "../CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaModule } from "../../utils/shemas";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";

const LoginForm = () => {
  const navigate = useNavigate();
  const { isLoading, loginError, onFormSubmit, clearLoginError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaModule.login),
  });

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Stack gap={2}>
        <Typography variant="h6" color="inherit" component="div">
          Sign in
        </Typography>
        <CustomInput
          register={register}
          name="email"
          label="Email"
          variant="outlined"
          error={!!errors.email?.message}
          helperText={errors.email?.message}
        />
        <CustomInput
          register={register}
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <Stack direction="row" justifyContent="flex-end" gap={0.5}>
          <Typography variant="subtitle2">Don't have an account?</Typography>{" "}
          <Typography
            variant="subtitle2"
            className="cursor-pointer"
            onClick={() => navigate("/sign-up")}
            component="a"
          >
            Sign Up
          </Typography>
        </Stack>
        <Button variant="contained" loading={isLoading} type="submit">
          Sign in
        </Button>
      </Stack>
      <ErrorSnackbar
        isOpen={!!loginError}
        errorMessage={loginError}
        onClose={clearLoginError}
      />
    </form>
  );
};

export default LoginForm;
