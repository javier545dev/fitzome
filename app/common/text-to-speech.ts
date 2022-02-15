export const eed = {
  language: 'es-ES',
  pitch: 1,
  rate: 0.8, 
  voice: 'es-es-x-eed-network',
};

export const ana = {
  language: 'es-ES',
  pitch: 1,
  rate: 0.8,
  voice: 'es-es-x-ana-network',
};

export const coachPhrases = {
  signup: {
    wellcome: (name: string) =>
      `Hola ${
        name === 'Rivas' ? '' : name
      }. Soy tu entrenador virtual. Presiona comenzar para crear tu cuenta.`,
  },
};
