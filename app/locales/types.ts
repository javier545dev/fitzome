export type languageTypes = 'es';

export interface DirectoryInterface {
  screens: {
    initialScreen: {
      signup: string;
      login: string;
      mainLabel: string;
      terms1: string;
      terms2: string;
    };
    loginScreen:{
      title:string;
      mainLabel: string;
      loginWithFacebook: string;
      loginWithGoogle: string;
    },
    signupScreen:{
      title:string;
      mainLabel: string;
      signupWithFacebook: string;
      signupWithGoogle: string;
    }
  };
  muscles: {
    all: string;
    ankle: string;
    lumbar: string;
    back: string;
    leg: string;
    glute: string;
    groin: string;
    hip: string;
    upper_abs: string;
    lower_abs: string;
    obliques: string;
    arm: string;
    shoulder: string;
    chest: string;
    wrist: string;
    knee: string;
  };
}
