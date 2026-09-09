export type StoreProduct = {
  name: string;
  price: string;
  benefits: string[];
  action: string;
  popular?: boolean;
};

export const products: StoreProduct[] = [
  {
    name: 'Apoiador',
    price: 'R$ 9,90',
    benefits: ['Cargo exclusivo no Discord', 'Tag exclusiva', 'Cosméticos', 'Apoie o desenvolvimento do servidor'],
    action: 'Ver benefícios',
  },
  {
    name: 'VIP',
    price: 'R$ 19,90',
    benefits: ['Tudo do Apoiador', 'Cor exclusiva no chat', 'Cosméticos adicionais', 'Prioridade na fila', 'Kit cosmético'],
    action: 'Comprar VIP',
    popular: true,
  },
  {
    name: 'VIP+',
    price: 'R$ 34,90',
    benefits: ['Tudo do VIP', 'Tag VIP+', 'Mais cosméticos', 'Efeitos exclusivos', 'Prioridade superior'],
    action: 'Comprar VIP+',
  },
];

