import type { Config } from 'tailwindcss'
import { tailwindThemeExtension } from '@grocery-multibanner/theme-tokens'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: tailwindThemeExtension,
  },
  plugins: [],
}

export default config
