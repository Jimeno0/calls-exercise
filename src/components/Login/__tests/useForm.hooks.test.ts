import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "../useForm.hooks";

const mockedHandleLogin = jest.fn();

jest.mock("../../../hooks", () => ({
  useAuth: () => ({
    handleLogin: mockedHandleLogin,
  }),
}));

const username = "username";
const password = "password";

const usernameEvent = {
  currentTarget: {
    value: username,
  },
} as React.ChangeEvent<HTMLInputElement>;
const passwordEvent = {
  currentTarget: {
    value: password,
  },
} as React.ChangeEvent<HTMLInputElement>;
const submitEvent = {
  preventDefault: () => {},
} as React.ChangeEvent<HTMLFormElement>;

describe("useForm Login", () => {
  test("Trigger expected handlers", () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handleUsername(usernameEvent);
      result.current.handlePassword(passwordEvent);
    });

    expect(result.current.username).toBe("username");
    expect(result.current.password).toBe("password");

    act(() => {
      result.current.handleSubmit(submitEvent);
    });
    expect(mockedHandleLogin).toHaveBeenCalledWith({ username, password });
  });
});
