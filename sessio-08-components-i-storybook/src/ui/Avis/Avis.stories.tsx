import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Avis } from './Avis';

const meta = {
  title: 'PratShop UI/Avis',
  component: Avis,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    children: 'Els enviaments de més de 50 € són gratuïts.',
  },
} satisfies Meta<typeof Avis>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Exit: Story = {
  args: { tipus: 'exit', titol: 'Comanda confirmada', children: 'Rebràs un correu amb el número de seguiment.' },
};

export const Advertencia: Story = {
  args: { tipus: 'avis', children: 'Només queden 2 unitats d\'aquesta talla.' },
};

export const Errada: Story = {
  args: { tipus: 'error', titol: 'No s\'ha pogut pagar', children: 'Revisa les dades de la targeta i torna-ho a provar.' },
};

export const AmbBotoDeTancar: Story = {
  args: { tipus: 'exit', children: 'Producte afegit al carro.', onTancar: fn() },
};
