import { useState } from "react";
import { useAuth } from "hooks/useAuth";
import {
  Button,
  PreferencesOutlined,
  Toggle,
  Box,
  Spacer,
  Flex,
  Typography,
} from "@aircall/tractor";
import { NavbarWrapper } from "./Navbar.styled";
import { FiltersModal } from "components/FiltersModal";
import { useCalls } from "hooks/useCalls";

export const Navbar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { handleLogout } = useAuth();
  const { isGroupedByDateActive, setIsGroupedByDateActive } = useCalls();

  return (
    <>
      <FiltersModal
        isOpen={isOpenModal}
        onCloseModal={() => {
          setIsOpenModal(false);
        }}
      />
      <NavbarWrapper>
        <Flex alignItems="center">
          <Toggle
            checked={isGroupedByDateActive}
            onChange={setIsGroupedByDateActive}
          />
          <Typography ml={2} color="primary.base">
            Filter by date
          </Typography>
        </Flex>
        <Box>
          <Spacer mr={4}>
            <Button onClick={handleLogout} mode="outline">
              Logout
            </Button>
          </Spacer>
          <Button onClick={() => setIsOpenModal(true)}>
            <PreferencesOutlined />
            <Typography display={{ _: "none", md: "block" }}>Filter</Typography>
          </Button>
        </Box>
      </NavbarWrapper>
    </>
  );
};
