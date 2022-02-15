interface IntentInterface {
  id: string;
  name: 'create_workout' | 'greet';
  confidence: number;
}

interface EntitiInterface {
  id: string;
  name: string;
  role: string;
  start: number;
  end: number;
  body: string;
  confidence: number;
  entities: [];
  value: string;
  type: string;
}

export interface WitResponseInterface {
  text: string;
  intents: IntentInterface[];
  entities: {
    [key: string]: EntitiInterface[];
  };
  traits: {};
}

export type CustomWorkoutTypes = 'abs' | 'pierna' | 'gluteo' | 'tren_superior';
