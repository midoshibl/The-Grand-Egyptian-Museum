export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      colors: {
        dark: "#0A0908",
        dark2: "#140E06",
        gold: "#B4935A",
        brown: "#4E361A",
      },
    },
  },
  plugins: [],
};
