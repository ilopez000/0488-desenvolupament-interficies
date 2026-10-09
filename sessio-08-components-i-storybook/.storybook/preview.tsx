import type { Preview } from '@storybook/react-vite';
// Els tokens (colors, espais…) s'han de carregar també dins de Storybook
import '../src/ui/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
