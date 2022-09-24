import { render, screen } from "custom-render.jest";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import { PATHS } from "constants/index";
import { BrowserRouter } from "react-router-dom";

const mockedLoggedInValue = jest.fn();

jest.mock("hooks/useAuth", () => ({
  useAuth: () => ({
    isUserLoggedIn: mockedLoggedInValue(),
  }),
}));

const RoutesWithProtected = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path={"/"} element={<div>Home route</div>} />
        </Route>
        <Route path={PATHS.login} element={<div>Login route</div>} />
      </Routes>
    </BrowserRouter>
  );
};

describe("ProtectedRoute", () => {
  test("Renders children route if is logged in", () => {
    mockedLoggedInValue.mockImplementation(() => true);
    render(<RoutesWithProtected />);
    const loginView = screen.getByText("Home route");
    expect(loginView).toBeInTheDocument();
  });
  test("Redirects to login if user is not logged in", () => {
    mockedLoggedInValue.mockImplementation(() => false);
    render(<RoutesWithProtected />);
    const loginView = screen.getByText("Login route");
    expect(loginView).toBeInTheDocument();
  });
});
