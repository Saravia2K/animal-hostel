export const COLORS = {
  lightGreen: "#7fc243",
  darkGreen: "#589237",
  orange: "#fe7f2d",
  grey: "#f0ecec",
};

export const Breakpoints = {
  mobile: { min: 0, max: 599 },
  tablet: { min: 600, max: 899 },
  laptop: { min: 900, max: 1199 },
  desktop: { min: 1200, max: 1535 },
  desktopXL: { min: 1536, max: Infinity },
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
