import styled from "styled-components";

export const Container = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  position: relative;
  height: calc(100vh - 100px);
  display: flex;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
`;
