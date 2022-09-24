import { render, screen } from "custom-render.jest";
import userEvent from "@testing-library/user-event";
import { Navbar } from "../Navbar";

const mockedHandleLogout = jest.fn();

jest.mock("hooks", () => ({
  useAuth: () => ({
    handleLogout: mockedHandleLogout(),
  }),
}));

describe("Navbar", () => {
  test("Triggers logout action", () => {
    render(<Navbar />);
    const logoutButton = screen.getByText("Logout");
    userEvent.click(logoutButton);
    expect(mockedHandleLogout).toHaveBeenCalled();
  });

  test("Modal hidden by default", () => {
    render(<Navbar />);
    const modalTitle = screen.queryByText("Filter results");
    expect(modalTitle).not.toBeInTheDocument();
  });
  test("Opens modal on filter click", () => {
    render(<Navbar />);
    const filterButton = screen.getByText("Filter");
    userEvent.click(filterButton);
    const modalTitle = screen.queryByText("Filter results");
    expect(modalTitle).toBeInTheDocument();
  });
});
