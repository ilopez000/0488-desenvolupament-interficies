import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Valoracio, type ValoracioProps } from './Valoracio';

const meta = {
  title: 'PratShop UI/Valoracio',
  component: Valoracio,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { valor: 3 },
  argTypes: {
    valor: { control: { type: 'range', min: 0, max: 10, step: 1 } },
    maxim: { control: { type: 'number', min: 1, max: 10 } },
  },
} satisfies Meta<typeof Valoracio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NomesLectura: Story = {};

export const DeuEstrelles: Story = {
  args: { valor: 7, maxim: 10 },
};

// Valoracio és un component controlat: no guarda la puntuació, l'ha de guardar el pare.
// Per provar-lo a Storybook fem un petit pare amb useState.
function ValoracioAmbEstat(props: ValoracioProps) {
  const [valor, setValor] = useState(props.valor);
  return (
    <Valoracio
      {...props}
      valor={valor}
      onCanvi={(nou) => {
        setValor(nou);
        props.onCanvi?.(nou);
      }}
    />
  );
}

export const Interactiva: Story = {
  args: { valor: 0, onCanvi: fn(), etiqueta: 'La teva valoració' },
  render: (args) => <ValoracioAmbEstat {...args} />,
};
