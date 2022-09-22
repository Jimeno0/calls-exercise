import { useAuth } from "../../hooks";
import { Button } from "@aircall/tractor";
import { NavbarWrapper } from "./Navbar.styled";

export const Navbar = () => {
  const { handleLogout } = useAuth();

  return (
    <NavbarWrapper>
      <Button onClick={handleLogout} mode="outline">
        Logout
      </Button>
      <Button>Filter</Button>
    </NavbarWrapper>
  );
};
