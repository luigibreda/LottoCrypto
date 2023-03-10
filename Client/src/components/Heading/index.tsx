import styled from "styled-components";

export const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
`;

export const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;

export const H3 = styled.h3`
  font-size: 1.3rem;
`;

type PProps = {
  bold?: boolean;
};

export const P = styled.p<PProps>`
  font-weight: ${({ bold }) => (bold ? "700" : "400")};
  color: #afafaf;
  font-size: 0.8rem;
  font-weight: 400;
`;
