import type { Meta, StoryObj } from '@storybook/react-vite';
import { Insignia } from './Insignia';

const meta = {
  title: 'PratShop UI/Insignia',
  component: Insignia,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: 'Novetat' },
} satisfies Meta<typeof Insignia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutre: Story = {};

export const Exit: Story = {
  args: { to: 'exit', children: 'En estoc' },
};

export const Avis: Story = {
  args: { to: 'avis', children: 'Últimes unitats' },
};

export const Perill: Story = {
  args: { to: 'perill', children: '−20 %' },
};
