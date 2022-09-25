import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  top: 0px;
  position: sticky;
  height: 70px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  > button {
    margin: 0 10px;
  }
  > button:last-child {
    margin-right: 0px;
  }
  background: white;
  ${({ theme }) => `box-shadow: ${theme?.shadows?.["1"]};`}
`;
