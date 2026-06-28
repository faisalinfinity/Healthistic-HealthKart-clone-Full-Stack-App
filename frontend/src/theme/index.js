import { extendTheme } from "@chakra-ui/react";

/**
 * "Vital" — Healthistic design system.
 * A modern wellness-commerce aesthetic: deep teal brand + warm amber accent
 * on warm paper, distinctive Bricolage Grotesque display type paired with the
 * clean Hanken Grotesk for body copy.
 */

const colors = {
  brand: {
    50: "#E6FBFA",
    100: "#C2F4F2",
    200: "#8AE9E6",
    300: "#4FD9D6",
    400: "#1FC2C1",
    500: "#0FB5B7",
    600: "#0C9698",
    700: "#0C7779",
    800: "#0E5E60",
    900: "#103E40",
  },
  accent: {
    50: "#FFF6EC",
    100: "#FFE8CC",
    200: "#FFD199",
    300: "#FFB85F",
    400: "#FFA02E",
    500: "#FF8913",
    600: "#E5710A",
    700: "#BF5708",
    800: "#99450C",
    900: "#7D3A0E",
  },
  ink: {
    50: "#EEF2F2",
    100: "#D3DBDB",
    200: "#A7B6B6",
    300: "#7A9190",
    400: "#506766",
    500: "#2F4544",
    600: "#21302F",
    700: "#16201F",
    800: "#0D1615",
    900: "#070D0C",
  },
  paper: "#F7F6F1",
};

const fonts = {
  heading: `'Bricolage Grotesque', 'Hanken Grotesk', -apple-system, sans-serif`,
  body: `'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
};

const shadows = {
  xs: "0 1px 2px rgba(13, 33, 34, 0.06)",
  sm: "0 1px 3px rgba(13, 33, 34, 0.08), 0 1px 2px rgba(13, 33, 34, 0.04)",
  base: "0 4px 16px -4px rgba(13, 33, 34, 0.10)",
  md: "0 8px 28px -8px rgba(13, 33, 34, 0.16)",
  lg: "0 18px 48px -16px rgba(13, 33, 34, 0.22)",
  xl: "0 28px 64px -20px rgba(13, 33, 34, 0.28)",
  brand: "0 12px 28px -10px rgba(15, 181, 183, 0.55)",
  accent: "0 12px 28px -10px rgba(255, 137, 19, 0.5)",
  outline: "0 0 0 3px rgba(15, 181, 183, 0.35)",
};

const radii = {
  md: "0.625rem",
  lg: "0.875rem",
  xl: "1.125rem",
  "2xl": "1.5rem",
  "3xl": "2rem",
};

const styles = {
  global: {
    "html, body": {
      bg: "paper",
      color: "ink.700",
      fontFeatureSettings: '"ss01", "cv01"',
      scrollBehavior: "smooth",
    },
    "::selection": {
      bg: "brand.200",
      color: "ink.900",
    },
    "*::-webkit-scrollbar": {
      width: "10px",
      height: "10px",
    },
    "*::-webkit-scrollbar-track": {
      bg: "transparent",
    },
    "*::-webkit-scrollbar-thumb": {
      bg: "blackAlpha.200",
      borderRadius: "full",
      border: "2px solid transparent",
      backgroundClip: "content-box",
    },
    "*::-webkit-scrollbar-thumb:hover": {
      bg: "blackAlpha.300",
      backgroundClip: "content-box",
    },
    // Keep react-multi-carousel arrows above cards and on-brand
    ".react-multi-carousel-list": {
      paddingBottom: "8px",
    },
    ".react-multi-carousel-track": {
      alignItems: "stretch",
    },
    ".hk-carousel-item": {
      display: "flex",
      height: "auto",
    },
    ".react-multiple-carousel__arrow": {
      background: "rgba(13,33,34,0.6)",
      minWidth: "38px",
      minHeight: "38px",
      zIndex: 5,
    },
    ".react-multiple-carousel__arrow:hover": {
      background: "#0FB5B7",
    },
    ".react-multi-carousel-dot button": {
      borderColor: "#0FB5B7",
    },
    ".react-multi-carousel-dot--active button": {
      background: "#0FB5B7",
    },
  },
};

const components = {
  Heading: {
    baseStyle: {
      letterSpacing: "-0.02em",
      fontWeight: "700",
    },
  },
  Button: {
    baseStyle: {
      fontWeight: "600",
      borderRadius: "lg",
      letterSpacing: "-0.01em",
      transitionProperty: "common",
      transitionDuration: "200ms",
      _focusVisible: { boxShadow: "outline" },
    },
    sizes: {
      lg: { h: 12, px: 7, fontSize: "md" },
    },
    variants: {
      solid: {
        bg: "brand.500",
        color: "white",
        boxShadow: "sm",
        _hover: {
          bg: "brand.600",
          boxShadow: "brand",
          transform: "translateY(-1px)",
          _disabled: { bg: "brand.500", transform: "none" },
        },
        _active: { bg: "brand.700", transform: "translateY(0)" },
      },
      accent: {
        bg: "accent.500",
        color: "white",
        boxShadow: "sm",
        _hover: {
          bg: "accent.600",
          boxShadow: "accent",
          transform: "translateY(-1px)",
        },
        _active: { bg: "accent.700" },
      },
      outline: {
        borderWidth: "1.5px",
        borderColor: "brand.500",
        color: "brand.700",
        _hover: { bg: "brand.50" },
        _active: { bg: "brand.100" },
      },
      ghost: {
        color: "ink.600",
        _hover: { bg: "blackAlpha.50" },
      },
      soft: {
        bg: "brand.50",
        color: "brand.700",
        _hover: { bg: "brand.100" },
      },
    },
    defaultProps: { colorScheme: "brand" },
  },
  Input: {
    defaultProps: { focusBorderColor: "brand.500", variant: "outline" },
    variants: {
      outline: {
        field: {
          bg: "white",
          borderColor: "blackAlpha.200",
          borderRadius: "lg",
          _hover: { borderColor: "brand.300" },
          _placeholder: { color: "ink.300" },
        },
      },
    },
  },
  Textarea: {
    defaultProps: { focusBorderColor: "brand.500" },
    variants: {
      outline: {
        bg: "white",
        borderColor: "blackAlpha.200",
        borderRadius: "lg",
        _hover: { borderColor: "brand.300" },
        _placeholder: { color: "ink.300" },
      },
    },
  },
  Select: {
    defaultProps: { focusBorderColor: "brand.500", variant: "outline" },
    variants: {
      outline: {
        field: {
          bg: "white",
          borderColor: "blackAlpha.200",
          borderRadius: "lg",
          _hover: { borderColor: "brand.300" },
        },
      },
    },
  },
  FormLabel: {
    baseStyle: {
      fontSize: "sm",
      fontWeight: "600",
      color: "ink.600",
      mb: "1.5",
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: "white",
        borderRadius: "xl",
        boxShadow: "sm",
        borderWidth: "1px",
        borderColor: "blackAlpha.100",
      },
    },
  },
  Badge: {
    baseStyle: {
      borderRadius: "md",
      textTransform: "none",
      fontWeight: "600",
      letterSpacing: "0",
      px: "2",
      py: "0.5",
    },
  },
  Link: {
    baseStyle: {
      color: "brand.700",
      fontWeight: "500",
      _hover: { textDecoration: "none", color: "brand.500" },
    },
  },
  Divider: {
    baseStyle: { borderColor: "blackAlpha.200" },
  },
  Drawer: {
    baseStyle: {
      dialog: { bg: "paper" },
    },
  },
  Modal: {
    baseStyle: {
      dialog: { borderRadius: "2xl", bg: "white" },
    },
  },
  Menu: {
    baseStyle: {
      list: {
        borderRadius: "xl",
        boxShadow: "md",
        borderColor: "blackAlpha.100",
        py: "2",
      },
      item: {
        fontWeight: "500",
        _hover: { bg: "brand.50" },
        _focus: { bg: "brand.50" },
      },
    },
  },
};

const theme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: false },
  colors,
  fonts,
  shadows,
  radii,
  styles,
  components,
});

export default theme;
