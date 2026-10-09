import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // On són les històries: al costat de cada component
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
};

export default config;
