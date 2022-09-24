import { useState } from "react";
import { useAuth } from "hooks";
import { Button } from "@aircall/tractor";
import { NavbarWrapper } from "./Navbar.styled";
import { FiltersModal } from "components/FiltersModal";

export const Navbar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { handleLogout } = useAuth();

  return (
    <>
      <FiltersModal
        isOpen={isOpenModal}
        onCloseModal={() => {
          setIsOpenModal(false);
        }}
      />
      <NavbarWrapper>
        <Button onClick={handleLogout} mode="outline">
          Logout
        </Button>
        <Button onClick={() => setIsOpenModal(true)}>Filter</Button>
      </NavbarWrapper>
    </>
  );
};
