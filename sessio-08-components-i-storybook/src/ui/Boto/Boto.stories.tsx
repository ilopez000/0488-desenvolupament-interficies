import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Boto } from './Boto';

// Icona de cor en SVG (aria-hidden: és decorativa, el nom el dona aria-label)
const Cor = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 3 5 6.6 5c2 0 3.4 1.1 4.2 2.3h2.4C14 6.1 15.4 5 17.4 5 21 5 23 8.6 21.6 11.8 19.5 16.4 12 21 12 21z" />
  </svg>
);

const meta = {
  title: 'PratShop UI/Boto',
  component: Boto,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Afegeix al carro',
    onClick: fn(),
  },
  argTypes: {
    icona: { control: 'select', options: [undefined, '🛒', '❤', '🗑'] },
  },
} satisfies Meta<typeof Boto>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primari: Story = {};

export const Secundari: Story = {
  args: { variant: 'secundari', children: 'Desa per a més tard' },
};

export const Perill: Story = {
  args: { variant: 'perill', children: 'Buida el carro', icona: '🗑' },
};

export const AmbIcona: Story = {
  args: { icona: '🛒' },
};

export const Carregant: Story = {
  args: { carregant: true, children: 'Afegint…' },
};

export const Desactivat: Story = {
  args: { disabled: true, children: 'Esgotat' },
};

export const Mides: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Boto {...args} mida="petita">Petita</Boto>
      <Boto {...args} mida="normal">Normal</Boto>
      <Boto {...args} mida="gran">Gran</Boto>
    </div>
  ),
};

export const NomesIcona: Story = {
  args: { icona: Cor, children: undefined, variant: 'secundari', 'aria-label': 'Afegeix als preferits' },
};
