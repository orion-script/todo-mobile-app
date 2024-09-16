import React, { ReactNode } from "react";
import styled from "styled-components/native";

// Styled component for Spacer with flex property
const SpacerView = styled.View<{ flex?: number }>`
  flex: ${({ flex }) => flex || 1};
`;

// Spacer component props
interface SpacerProps {
  flex?: number;
  children?: ReactNode;
}

// Spacer component implementation
export const Spacer: React.FC<SpacerProps> = ({ flex = 1, children }) => {
  return <SpacerView flex={flex}>{children}</SpacerView>;
};
