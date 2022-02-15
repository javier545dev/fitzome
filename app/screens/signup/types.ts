import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  signup: {
    name: string;
    id: number;
    img: string;
    email: string;
  };
};

type SignupScreenProps = RouteProp<RootStackParamList, 'signup'>;

export type RouteParams = {route: SignupScreenProps};
