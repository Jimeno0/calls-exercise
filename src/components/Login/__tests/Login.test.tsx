import { render, screen } from "../../../custom-render.jest";
import { Login } from "../Login";
import userEvent from "@testing-library/user-event";

const mockedHandleSubmit = jest.fn();
const mockedHandleUsername = jest.fn();
const mockedHandlePassword = jest.fn();

jest.mock("../useForm.hooks", () => ({
  useForm: () => ({
    handleSubmit: mockedHandleSubmit(),
    handlePassword: mockedHandlePassword(),
    handleUsername: mockedHandleUsername(),
  }),
}));

describe("Login", () => {
  test("Renders Login fields", () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  test("Button does not trigger submit if there is no data", () => {
    render(<Login />);
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    expect(submitButton).toHaveAttribute("disabled");
  });
  test("Form triggers handler events", () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button");
    userEvent.type(usernameInput, "username");
    expect(mockedHandleUsername).toHaveBeenCalled();
    userEvent.type(passwordInput, "password");
    expect(mockedHandlePassword).toHaveBeenCalled();
    userEvent.click(submitButton);
    expect(mockedHandleSubmit).toHaveBeenCalled();
  });
});
