import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { isSigningUp, signUp } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signUp(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  /*
  function onError(errors) {
    console.group("errors");
    console.dir(errors);
    console.groupEnd();
  }
  */

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errorMessage={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", {
            required: "Full name is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" errorMessage={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email is not the right format",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        errorMessage={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be a minimum of 8 characters in length",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        errorMessage={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "Password confirmation is required",
            validate: (confirmPassword) =>
              confirmPassword === getValues().password ||
              "Passwords should match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSigningUp}>
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
