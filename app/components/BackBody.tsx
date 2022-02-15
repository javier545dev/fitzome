import * as React from 'react';
import Svg, { SvgProps, Path, Polygon } from 'react-native-svg';

interface Props extends SvgProps {
    width: number;
    backgroundColor?: string;
    knee?: string;
    gastrocnemius?: string;
    ankle?: string;
    feet?: string;
    glute?: string;
    groin?: string;
    hamstrings?: string;
    lumbar?: string;
    dorsal?: string;
    shoulders?: string;
    triceps?: string;
    elbow?: string;
    forearms?: string;
    back?: string;
    neck?: string;
    trapezius?: string;
}

const defaultColor = '#e9e9e9'; //#e0dada

export default function BackBodySvg({
    width,
    backgroundColor = defaultColor,
    knee = defaultColor,
    gastrocnemius = defaultColor,
    ankle = defaultColor,
    feet = defaultColor,
    glute = defaultColor,
    groin = defaultColor,
    hamstrings = defaultColor,
    lumbar = defaultColor,
    dorsal = defaultColor,
    shoulders = defaultColor,
    triceps = defaultColor,
    elbow = defaultColor,
    forearms = defaultColor,
    back = defaultColor,
    neck = defaultColor,
    trapezius = defaultColor,
}: Props) {
    const height = width * 2.415;
    return (
        <Svg viewBox="0 0 1124.94 2732" style={{ height: height, width }}>
            {/*knee*/}
            <Polygon
                points="452.36 1851.09 374.98 1797.53 297.6 1851.09 285.7 1928.47 357.12 1987.99 440.45 1964.18 452.36 1851.09"
                fill={knee}
            />
            <Polygon
                points="672.58 1851.09 749.96 1797.53 827.34 1851.09 839.24 1928.47 767.82 1987.99 684.49 1964.18 672.58 1851.09"
                fill={knee}
            />
            {/*gastrocnemius*/}
            <Path
                d="M796.41,2474.11S735.18,2247.85,725,2170.55c-6.23-47.23-6-190.46-6-190.46s59,23.37,65.47,41.66C820.21,2122.94,796.41,2474.11,796.41,2474.11Z"
                transform="translate(-439.28 -4)"
                fill={gastrocnemius}
            />
            <Path
                d="M867.83,2456.25l-29.76-47.61-29.76-386.89s77.75-44.74,83.33-23.81C915.45,2087.22,867.83,2456.25,867.83,2456.25Z"
                transform="translate(-439.28 -4)"
                fill={gastrocnemius}
            />
            <Path
                d="M1207.1,2474.11s61.23-226.26,71.42-303.56c6.23-47.23,6-190.46,6-190.46s-59,23.37-65.47,41.66C1183.29,2122.94,1207.1,2474.11,1207.1,2474.11Z"
                transform="translate(-439.28 -4)"
                fill={gastrocnemius}
            />
            <Path
                d="M1135.67,2456.25l29.76-47.61,29.76-386.89s-77.74-44.74-83.33-23.81C1088.06,2087.22,1135.67,2456.25,1135.67,2456.25Z"
                transform="translate(-439.28 -4)"
                fill={gastrocnemius}
            />
            {/*ankle */}
            <Polygon
                points="392.84 2434.4 351.17 2547.49 458.31 2547.49 392.84 2434.4"
                fill={ankle}
            />
            <Polygon
                points="732.11 2434.4 773.77 2547.49 666.63 2547.49 732.11 2434.4"
                fill={ankle}
            />
            {/*feet*/}
            <Polygon
                points="464.26 2732 327.36 2732 351.17 2571.29 458.31 2583.2 464.26 2732"
                fill={feet}
            />
            <Polygon
                points="660.68 2732 797.58 2732 773.77 2571.29 666.63 2583.2 660.68 2732"
                fill={feet}
            />
            {/*glute*/}
            <Path
                d="M975,1242c16.27,10.32-200.28,45.83-244,6-53.73-49,5.87-237.05,6-226.18l244,6Z"
                transform="translate(-439.28 -4)"
                fill={glute}
            />
            <Path
                d="M1028.54,1242c-16.27,10.32,200.27,45.83,244,6,53.73-49-5.87-237.05-6-226.18l-244,6Z"
                transform="translate(-439.28 -4)"
                fill={glute}
            />
            {/*groin*/}
            <Polygon
                points="541.64 1261.84 428.55 1279.69 505.92 1440.4 541.64 1261.84"
                fill={groin}
            />
            <Polygon
                points="583.3 1261.84 696.39 1279.69 619.02 1440.4 583.3 1261.84"
                fill={groin}
            />
            {/*hamstrings */}
            <Polygon
                points="404.74 1279.69 339.27 1285.65 392.84 1761.81 428.55 1791.57 464.26 1410.64 404.74 1279.69"
                fill={hamstrings}
            />
            <Polygon
                points="369.03 1761.81 303.56 1809.43 285.7 1273.74 321.41 1285.65 369.03 1761.81"
                fill={hamstrings}
            />
            <Polygon
                points="464.26 1815.38 446.4 1797.53 476.17 1428.5 499.97 1452.31 464.26 1815.38"
                fill={hamstrings}
            />
            <Polygon
                points="720.2 1279.69 785.67 1285.65 732.11 1761.81 696.39 1791.57 660.68 1410.64 720.2 1279.69"
                fill={hamstrings}
            />
            <Polygon
                points="755.91 1761.81 821.39 1809.43 839.24 1273.74 803.53 1285.65 755.91 1761.81"
                fill={hamstrings}
            />
            <Polygon
                points="660.68 1815.38 678.54 1797.53 648.78 1428.5 624.97 1452.31 660.68 1815.38"
                fill={hamstrings}
            />
            {/*lumbar */}
            <Polygon
                points="547.59 1005.9 309.51 999.95 339.27 779.72 428.55 797.58 547.59 755.91 547.59 1005.9"
                fill={lumbar}
            />
            <Polygon
                points="577.35 1005.9 815.43 999.95 785.67 779.72 696.39 797.58 577.35 755.91 577.35 1005.9"
                fill={lumbar}
            />
            {/*dorsal */}
            <Polygon
                points="327.36 297.6 255.94 315.46 345.22 761.87 428.55 779.72 559.5 726.15 327.36 297.6"
                fill={dorsal}
            />
            <Polygon
                points="797.58 297.6 869 315.46 779.72 761.87 696.39 779.72 565.45 726.15 797.58 297.6"
                fill={dorsal}
            />
            {/*shoulders */}
            <Polygon
                points="297.6 279.75 160.71 339.27 160.71 255.94 196.42 214.28 297.6 279.75"
                fill={shoulders}
            />
            <Polygon
                points="827.34 279.75 964.24 339.27 964.24 255.94 928.52 214.28 827.34 279.75"
                fill={shoulders}
            />
            {/*triceps */}
            <Polygon
                points="279.75 601.16 232.13 327.36 160.71 374.98 107.14 732.11 160.71 708.3 202.37 773.77 279.75 601.16"
                fill={triceps}
            />
            <Polygon
                points="845.19 601.16 892.81 327.36 964.24 374.98 1017.8 732.11 964.24 708.3 922.57 773.77 845.19 601.16"
                fill={triceps}
            />
            {/*elbow */}
            <Polygon
                points="190.47 791.63 119.04 863.05 107.14 749.96 154.75 732.11 190.47 791.63"
                fill={elbow}
            />
            <Polygon
                points="934.48 791.63 1005.9 863.05 1017.8 749.96 970.19 732.11 934.48 791.63"
                fill={elbow}
            />
            {/*forearms */}
            <Path
                d="M516.66,1123c-6.14,6.13-29.76-17.86-29.76-17.86s47.37-161.56,77.37-208.32c13.64-21.25,71.43-71.42,71.43-71.42S564.27,1075.37,516.66,1123Z"
                transform="translate(-439.28 -4)"
                fill={forearms}
            />
            <Polygon
                points="29.76 1089.23 0 1077.33 83.33 761.87 101.19 857.1 29.76 1089.23"
                fill={forearms}
            />
            <Path
                d="M1486.85,1123c6.13,6.13,29.76-17.86,29.76-17.86s-47.38-161.56-77.38-208.32c-13.64-21.25-71.43-71.42-71.43-71.42S1439.23,1075.37,1486.85,1123Z"
                transform="translate(-439.28 -4)"
                fill={forearms}
            />
            <Polygon
                points="1095.18 1089.23 1124.94 1077.33 1041.61 761.87 1023.76 857.1 1095.18 1089.23"
                fill={forearms}
            />
            {/*back */}
            <Polygon
                points="398.79 214.28 226.18 214.28 333.32 273.8 553.54 660.68 554.35 214.69 398.79 214.28"
                fill={back}
            />
            <Polygon
                points="726.15 214.28 898.76 214.28 791.63 273.8 571.4 660.68 570.59 214.69 726.15 214.28"
                fill={back}
            />
            {/*neck */}
            <Polygon
                points="547.59 166.66 470.21 71.42 470.21 0 547.59 0 547.59 166.66"
                fill={neck}
            />
            <Polygon
                points="577.35 166.66 654.73 71.42 654.73 0 577.35 0 577.35 166.66"
                fill={neck}
            />
            {/*trapezius */}
            <Polygon
                points="547.59 190.47 226.18 190.47 226.18 178.56 333.32 160.71 452.36 95.23 547.59 190.47"
                fill={trapezius}
            />
            <Polygon
                points="577.35 190.47 898.76 190.47 898.76 178.56 791.63 160.71 672.58 95.23 577.35 190.47"
                fill={trapezius}
            />
        </Svg>
    );
}
