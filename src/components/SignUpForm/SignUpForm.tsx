import { yupResolver } from "@hookform/resolvers/yup";
import { Typography, Stack, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { schemaModule } from "../../utils/shemas";
import { useNavigate } from "react-router-dom";
import CustomInput from "../CustomInput/CustomInput";
import { useSignUp } from "../../hooks/useSignUp";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { isLoading, signUpError, onFormSubmit, clearSignUpError } =
    useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaModule.signUp),
  });

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Stack gap={2}>
        <Typography variant="h6" color="inherit" component="div">
          Sign up
        </Typography>
        <CustomInput
          register={register}
          name="name"
          label="Name"
          variant="outlined"
          error={!!errors.name?.message}
          helperText={errors.name?.message}
        />
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
          label="Create password"
          variant="outlined"
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <Stack direction="row" justifyContent="flex-end" gap={0.5}>
          <Typography variant="subtitle2">Already have an account?</Typography>{" "}
          <Typography
            variant="subtitle2"
            className="cursor-pointer"
            onClick={() => navigate("/login")}
            component="a"
          >
            Sign In
          </Typography>
        </Stack>
        <Button variant="contained" type="submit" loading={isLoading}>
          Create account
        </Button>
      </Stack>
      <ErrorSnackbar
        isOpen={!!signUpError}
        errorMessage={signUpError}
        onClose={clearSignUpError}
      />
    </form>
  );
};

export default SignUpForm;
