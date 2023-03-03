import styled from "styled-components";

type ButtonProps = {
  themeType: string;
  color: string;
  width: string;
};

export const Container = styled.div<ButtonProps>`
  background-color: ${({ theme, themeType }) => theme.colors[themeType]};
  border-radius: 4px;
  color: ${({ color }) => color};
  width: ${({ width }) => width};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8em 1.4em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 700;

  &:hover {
    filter: brightness(0.9);
  }
`;
