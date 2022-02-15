import { UserState } from "redux/slices/userSlice";
/*
    Mifflin
    H = (9.99 * (kg) + 6.25 (cm) - 4.92 (años)) + 5
    M = (9.99 * (kg) + 6.25 (cm) - 4.92 (años)) - 161
    HarrisBenedict
    H = (66.473 + 13.751 * (kg) + 5.0033 * (cm) - 6.755 * (años))
    M = (655.0955 + 9.463 * (kg) + 1.8496 * (cm) - 4.6756 * (años))
*/
/**
 * Get the tasa metabolica en reposo
 * @param user 
 * @returns 
 */
export function getTMR (user: UserState): number {
  const {height, weight, gender, date} = user;
  const age = (new Date().getFullYear() - Number(date.year)) ?? 20;
  /**
   * Use two formulas
   */
  const harris = HarrisBenedict(height, weight, age, gender);
  const mifflin = Mifflin(height, weight, age, gender);
  /**
   * Return the media
   */
  return Math.round((harris + mifflin) / 2);
};
/**
 * Get the GTE gasto total de energia
 * @param user 
 * @returns 
 */
export function getGTE(user: UserState): number {
  const {height, weight, gender, date} = user;
  const age = (new Date().getFullYear() - Number(date.year)) ?? 20;
  let gte = 0;
  if (gender === 1) {
    //male
    gte = Math.round(
      662 - 9.53 * age + 1.15 * (15.9 * weight + 540 * (height / 100)),
    );
  } else {
    //female 354 - (6.91 x 27) + 1.15 [(9.36 x 81) + (726 x 1.75)]
    gte = Math.round(
      354 - 6.91 * age + 1.15 * (9.36 * weight + 726 * (height / 100)),
    );
  }
  return gte;
};

function HarrisBenedict(height:number, weight:number, age:number, gender:number):number{
  if (gender === 1) {
    //male
    return 66.473 + 13.751 * weight + 5.0033 * height - 6.755 * age;
  } else {
    //female
    return 655.0955 + 9.463 * weight + 1.8496 * height - 4.6756 * age;
  }
};

function Mifflin(height:number, weight:number, age:number, gender:number):number{
  if (gender === 1) {
    //male
    return 9.99 * weight + 6.25 * height - 4.92 * age + 5;
  } else {
    //female
    return 9.99 * weight + 6.25 * height - 4.92 * age - 161;
  }
};

/**
 * Get the user IMC
 * @param user 
 * @returns 
 */
export function calculateImc(user: UserState):number {
  const {weight, height: h} = user;
  const height = h / 100;
  const imc = Math.round(weight / (height * height));
  return imc;
}
