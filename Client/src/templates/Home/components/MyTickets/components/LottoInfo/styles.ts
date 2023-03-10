import styled from "styled-components";

type ContainerProps = {
  isLogged: boolean;
};

export const Container = styled.div<ContainerProps>`
  width: 380px;
  position: relative;
  background: #101010;
  border-radius: 5px;
  border: 2px dashed #373737;
  padding: 2em 1.4em;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  transition: 0.4s;
  opacity: ${({ isLogged }) => (isLogged ? 1 : 0.4)};
`;

export const Line = styled.div``;

export const Info = styled.div``;
