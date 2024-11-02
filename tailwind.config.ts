import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      roboto: 'var(--font-roboto)',
    },
    colors: {
      background: '#121214',
      elements: '#202024',
      icon: '#8D8D99',
      text: '#C4C4CC',
      title: '#E1E1E6',
      white: '#FFFFFF',
      principal: '#00875F',
      light: '#00B37E',
      begin: '#1EA483',
      end: '#7465D4',
    },
  },
  plugins: [],
}
export default config
