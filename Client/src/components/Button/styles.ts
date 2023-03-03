import styled from "styled-components";

type ButtonProps = {
  themeType: string;
  color: string;
  width: string;
  disabled?: boolean;
};

export const Container = styled.button<ButtonProps>`
  background-color: ${({ theme, themeType }) => theme.colors[themeType]};
  border: none;
  outline: none;
  border-radius: 4px;
  color: ${({ color }) => color};
  width: ${({ width }) => width};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 1.4em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: bold;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Text = styled.span`
  font-size: 1.2em;
  font-weight: bold;
`;
