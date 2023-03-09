import styled from "styled-components";

type TicketProps = {
  isWinner: boolean;
};

export const Container = styled.div<TicketProps>`
  position: relative;
  background: #101010;
  border-radius: 5px;
  border: ${({ isWinner }) =>
    isWinner ? "2px dashed #89FF13" : "2px dashed #373737"};
  padding: 2em 1.4em;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WinnerIcon = styled.div`
  position: absolute;
  right: 20px;
  top: -30px;
  background-color: #090909;
  border: 2px dashed #89ff13;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-radius: 50%;
`;

export const Line = styled.div``;

export const Label = styled.div``;
