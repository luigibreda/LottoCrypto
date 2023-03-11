import styled from "styled-components";

export const LinearProgressContainer = styled.div`
  width: 80%;
  height: 6px;
  background-color: #202020;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

type LinearProgressFillProps = {
  value: number | string;
};

export const LinearProgressFill = styled.div<LinearProgressFillProps>`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: #89ff13;
  position: absolute;
  top: 0;
  left: 0;
`;
