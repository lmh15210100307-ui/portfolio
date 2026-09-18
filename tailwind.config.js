/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `var(${variableName})`;
    }
    return `var(${variableName})`;
  };
}

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: withOpacity("--background"),
          card: withOpacity("--background-card"),
          elevated: withOpacity("--background-elevated"),
        },
        foreground: {
          DEFAULT: withOpacity("--foreground"),
          muted: withOpacity("--foreground-muted"),
          subtle: withOpacity("--foreground-subtle"),
        },
        accent: {
          DEFAULT: withOpacity("--accent"),
          hover: withOpacity("--accent-hover"),
        },
        border: {
          DEFAULT: withOpacity("--border"),
          light: withOpacity("--border-light"),
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        card: "20px",
        button: "12px",
        pill: "9999px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "blink": "blink 1s step-end infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
