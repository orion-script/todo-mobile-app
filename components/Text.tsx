import styled from "styled-components/native";

// Define a Theme type based on the expected structure of the theme object
type Theme = {
  fonts: {
    body: string;
    heading: string;
  };
  fontWeights: {
    regular: number;
    medium: number;
    bold: number;
  };
  colors: {
    text: {
      primary: string;
      error: string;
    };
  };
  fontSizes: {
    body: string;
    caption: string;
  };
};

// Default text styles with type annotations
const defaultTextStyles = (theme: Theme): string => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

// Individual variant functions with type annotations
const body = (theme: Theme): string => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme: Theme): string => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme: Theme): string => `
    color: ${theme.colors.text.error};
`;

const caption = (theme: Theme): string => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme: Theme): string => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

// Variants object with a record of available variants
const variants: Record<string, (theme: Theme) => string> = {
  body,
  label,
  caption,
  error,
  hint,
};

// Styled component with variant and theme
interface TextProps {
  variant?: keyof typeof variants;
  theme: Theme;
}

export const Text = styled.Text<TextProps>`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant = "body", theme }) => variants[variant](theme)}
`;

// Set default props in TypeScript
Text.defaultProps = {
  variant: "body",
};
