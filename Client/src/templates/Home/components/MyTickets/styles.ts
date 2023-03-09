import styled from "styled-components";

export const Container = styled.div`
  width: 50%;
  padding: 2em;
  gap: 10px;
  max-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  width: 30%;
`;

type BulletProps = {
  active?: boolean;
};

export const Bullet = styled.div<BulletProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  cursor: pointer;
`;

export const TimeLeft = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: column;
`;

export const TimeLeftText = styled.div``;
