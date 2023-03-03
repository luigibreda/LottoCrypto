import styled from "styled-components";

type SphereProps = {
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;

  scaleInPx?: number;
  background?: string;
};

export const Sphere = styled.div<SphereProps>`
  position: absolute;
  width: ${({ scaleInPx }) => scaleInPx || 100}px;
  height: ${({ scaleInPx }) => scaleInPx || 100}px;
  border-radius: 50%;
  background: ${({ background }) => background || "#89FF13"};
  opacity: 0.6;
  filter: blur(80px);
`;
