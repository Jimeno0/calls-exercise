import { Navigate } from "react-router-dom";
import {
  Flex,
  Form,
  FormItem,
  TextFieldInput,
  Grid,
  Button,
} from "@aircall/tractor";
import { PATHS } from "constants/index";
import { useForm } from "./useForm.hooks";

export const Login = () => {
  const {
    handleSubmit,
    handlePassword,
    handleUsername,
    isUserLoggedIn,
    username,
    password,
  } = useForm();

  const isButtonDisabled = !username || !password;

  if (isUserLoggedIn) return <Navigate to={PATHS.home} />;

  return (
    <Flex
      flexDirection="column"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Form onSubmit={handleSubmit}>
        <Grid
          width={{
            _: "90vw",
            md: "300px",
            xl: "300px",
          }}
          gridColumnGap={4}
          gridRowGap={5}
          gridTemplateColumns="1fr 1fr"
        >
          <FormItem label="Username" name="username" gridColumn="1 / 3">
            <TextFieldInput
              placeholder="type your username here..."
              value={username}
              onChange={handleUsername}
            />
          </FormItem>
          <FormItem label="Password" name="password" gridColumn="1 / 3">
            <TextFieldInput
              type="password"
              value={password}
              onChange={handlePassword}
            />
          </FormItem>
          <FormItem gridColumn="1 / 3">
            <Button disabled={isButtonDisabled} type="submit">
              Login
            </Button>
          </FormItem>
        </Grid>
      </Form>
    </Flex>
  );
};
