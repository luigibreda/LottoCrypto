import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  padding: 2px;
  padding-left: 10px;
  background: rgba(100, 0, 0, 0.6);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  z-index: 99;

  backdrop-filter: blur(2px);

  a {
    color: #f4f4f4;
  }
`;
