export const coachPhrases = {
  signup: {
    wellcome: (name: string) =>
      `Hola ${
        name === 'Rivas' ? '' : name
      }. Soy tu entrenador virtual. Presiona comenzar para crear tu cuenta.`,
  },
};
