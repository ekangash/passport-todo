const XS = "450px";
const SM = "640px";
const MD = "768px";
const LG = "1024px";
const XL = "1280px";
const XXL = "1536px";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
      14: "14",
      15: "15",
      16: "16",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      xs: XS,
      // => @upload (min-width: 450px) { ... }
      sm: SM,
      // => @upload (min-width: 640px) { ... }
      md: MD,
      // => @upload (min-width: 768px) { ... }
      lg: LG,
      // => @upload (min-width: 1024px) { ... }
      xl: XL,
      // => @upload (min-width: 1280px) { ... }
      "2xl": XXL,
      // => @upload (min-width: 1536px) { ... }
    },
    extend: {
      height: {
        xs: XS,
        sm: SM,
        md: MD,
        lg: LG,
        xl: XL,
        "2xl": XXL,
      },
      minHeight: {
        "12": "3rem" /* 48px */,
        "32": "8rem" /* 128px */,
        "40": "10rem" /* 160px */,
        "48": "12rem" /* 192px */,
        "52": "13rem" /* 208px */,
        "56": "14rem" /* 224px */,
        "60": "15rem" /* 240px */,
        "64": "16rem" /* 256px */,
        "72": "18rem" /* 288px */,
        "80": "20rem" /* 320px */,
        "96": "24rem" /* 384px */,
        xs: XS,
        sm: SM,
        md: MD,
        lg: LG,
        xl: XL,
        "2xl": XXL,
      },
      maxHeight: {
        "12": "3rem" /* 48px */,
        "32": "8rem" /* 128px */,
        "40": "10rem" /* 160px */,
        "48": "12rem" /* 192px */,
        "52": "13rem" /* 208px */,
        "56": "14rem" /* 224px */,
        "60": "15rem" /* 240px */,
        "64": "16rem" /* 256px */,
        "72": "18rem" /* 288px */,
        "80": "20rem" /* 320px */,
        "96": "24rem" /* 384px */,
        xs: XS,
        sm: SM,
        md: MD,
        lg: LG,
        xl: XL,
        "2xl": XXL,
      },
      width: {
        xs: XS,
        sm: SM,
        md: MD,
        lg: LG,
        xl: XL,
        "2xl": XXL,
      },
      minWidth: {
        "14": "3.5rem" /* 56px */,
        "16": "4rem" /* 64px */,
        "20": "5rem" /* 80px */,
        "28": "7rem" /* 128px */,
        "32": "8rem" /* 128px */,
        "40": "10rem" /* 160px */,
        xs: XS,
        sm: SM,
        md: MD,
        lg: LG,
        xl: XL,
        "2xl": XXL,
      },
      maxWidth: {
        "12": "3rem" /* 48px */,
        "14": "3.5rem" /* 56px */,
        "16": "4rem" /* 64px */,
        "20": "5rem" /* 80px */,
        "28": "7rem" /* 128px */,
        "32": "8rem" /* 128px */,
        "40": "10rem" /* 160px */,
        "48": "12rem" /* 192px */,
        "52": "13rem" /* 208px */,
        "56": "14rem" /* 224px */,
        "60": "15rem" /* 240px */,
        "64": "16rem" /* 256px */,
        "72": "18rem" /* 288px */,
        "80": "20rem" /* 320px */,
        "96": "24rem" /* 384px */,
        xs: XS,
        sm: SM,
        md: MD,
        lg: LG,
        xl: XL,
        "2xl": XXL,
      },
      fontSize: {
        tiny: ".70rem",
        small: ".85rem",
        base: "1rem",
      },
      colors: {
        minor: {
          DEFAULT: "var(--minor)",
          foreground: "var(--minor-foreground)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          hoverable: "hsl(var(--secondary-hoverable))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        window: {
          DEFAULT: "hsl(var(--window))",
          foreground: "hsl(var(--window-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/aspect-ratio")],
};
