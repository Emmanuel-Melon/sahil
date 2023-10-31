import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Auto column grid with a min of 250px
        'auto-250': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["lemonade"],
  },
};
export default config;
