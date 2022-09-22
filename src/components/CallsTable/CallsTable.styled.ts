import styled from "styled-components";

export const CallsTableWrapper = styled.section`
  height: calc(100vh - 200px);
  overflow-y: scroll;
  position: relative;
  padding: 30px;
`;

export const PaginationWrapper = styled.div`
  > div {
    width: inherit;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;
