// Manim's classic colours. The light set is the same hues, darkened so the
// strokes still read against a pale background.
export type Palette = {
  dark: boolean;
  ink: string;
  blue: string;
  teal: string;
  green: string;
  gold: string;
  yellow: string;
  red: string;
  purple: string;
};

export const darkPalette: Palette = {
  dark: true,
  ink: "#ECEBE8",
  blue: "#58C4DD",
  teal: "#5CD0B3",
  green: "#83C167",
  gold: "#F0AC5F",
  yellow: "#F4D345",
  red: "#FC6255",
  purple: "#B189C6",
};

export const lightPalette: Palette = {
  dark: false,
  ink: "#101215",
  blue: "#1B6A8A",
  teal: "#1A8A6E",
  green: "#3F8030",
  gold: "#B06A08",
  yellow: "#A88400",
  red: "#CC3A29",
  purple: "#6E4690",
};
