import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { roboto } from 'styles';

interface Props {
    objective: number;
}

export default function CustomRecomendations({ objective }: Props) {
    // 1 : 'loseWeight'
    // 2 : 'gainMuscle'
    // 3 : 'improveHealth'
    const LoseWeight = () => (
        <View>
            <Text style={styles.text}>
                1.- La pérdida de peso debe ser gradual, no más de 1 kg por semana.
            </Text>
            <Text style={styles.text}>
                2.- Se necesita un déficit calórico de 3500 kcal para perder 454 gramos
                de grasa.
            </Text>
            <Text style={styles.text}>
                3.- El ritmo de pérdida de peso disminuye a medida que se adelgaza.
            </Text>
            <Text style={styles.text}>
                4.- Para perder peso y grasa se debe realizar entrenamiento aeróbico una
                o dos vece por día.
            </Text>
            <Text style={styles.text}>
                5.- Tu aporte calórico debe ser de 1200 kcal por día y el déficit
                calórico no debe superar las 1000 kcal por día.
            </Text>
        </View>
    );

    const GainMuscle = () => (
        <View>
            <Text style={styles.text}>
                1.- Se debe aumentar el aporte de proteínas diarias a 1.2 - 1.6 g * kg
                de peso corporal.
            </Text>
            <Text style={styles.text}>
                2.- Tu aporte calórico diario debe superar tus necesidades calóricas en
                400 o 500 kcal por día.
            </Text>
            <Text style={styles.text}>
                3.- Necesitas un balance energético positivo de 2800 a 3500 kcal para
                aumentar 454 gramos de tejido muscular.
            </Text>
            <Text style={styles.text}>
                4.- Los suplementos de aminoácidos pueden promover el crecimiento
                muscular si se toman inmediatamente antes y después de realizar
                ejercicio.
            </Text>
        </View>
    );

    const ImproveHeatlh = () => (
        <View>
            <Text style={styles.text}>
                1.- Para mantenerte saludable se recomienda realizar al menos 150
                minutos de actividad física por semana.
            </Text>
            <Text style={styles.text}>
                2.- El entrenamiento de resistencia es excelente para mantener la masa
                libre de grasa (para perder peso) y aumentar la masa libre de grasa
                (para aumentar de peso).
            </Text>
            <Text style={styles.text}>
                3.- En comparación con la grasa, el tejido muscular tiene mayor
                actividad metabólica y consume más calorías en reposo.
            </Text>
            <Text style={styles.text}>
                4.- La tasa metabólica en reposo se mantiene elevada durante 30 minutos
                o más después de terminar una actividad física intensa.
            </Text>
        </View>
    );

    return (
        <>
            {objective === 1 ? (
                <LoseWeight />
            ) : objective === 2 ? (
                <GainMuscle />
            ) : (
                <ImproveHeatlh />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: 'black',
        fontFamily: roboto.regular,
        marginBottom: 5,
    },
});
