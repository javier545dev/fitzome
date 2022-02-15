import * as React from 'react';
import Svg, { SvgProps, Path, Polygon } from 'react-native-svg';

interface Props extends SvgProps {
    width: number;
    backgroundColor?: string;
    quadriceps?: string;
    groin?: string;
    ankle?: string;
    feet?: string;
    neck?: string;
    forearm?: string;
    elbow?: string;
    biceps?: string;
    shoulders?: string;
    chest?: string;
    obliques?: string;
    abs?: string;
    knee?: string;
    tibialis?: string;
}

const defaultColor = '#e9e9e9'; //#e0dada

export default function FrontBodySvg({
    width,
    backgroundColor = defaultColor,
    feet = defaultColor,
    quadriceps = defaultColor,
    groin = defaultColor,
    ankle = defaultColor,
    neck = defaultColor,
    forearm = defaultColor,
    elbow = defaultColor,
    biceps = defaultColor,
    shoulders = defaultColor,
    chest = defaultColor,
    obliques = defaultColor,
    abs = defaultColor,
    knee = defaultColor,
    tibialis = defaultColor,
}: Props) {
    const height = width * 2.415;
    return (
        <Svg viewBox="0 0 1130.89 2732" style={{ height: height, width }}>
            {/*hip */}
            <Polygon
                points="351.17 1023.76 559.5 1232.08 797.58 1023.76 351.17 1023.76"
                fill={backgroundColor}
            />
            {/*abs */}
            <Polygon
                points="577.35 547.59 785.67 809.48 809.48 982.09 577.35 982.09 577.35 767.82 577.35 547.59"
                fill={abs}
            />
            <Polygon
                points="553.54 547.59 345.22 809.48 321.41 982.09 553.54 982.09 553.54 767.82 553.54 547.59"
                fill={abs}
            />
            {/*obliques */}
            <Polygon
                points="779.72 767.82 797.58 619.01 797.58 446.4 583.3 505.93 779.72 767.82"
                fill={obliques}
            />
            <Polygon
                points="351.17 767.82 333.32 619.01 333.32 446.4 547.59 505.93 351.17 767.82"
                fill={obliques}
            />
            {/*chest */}
            <Path
                d="M1071.13,464.26c-.19,66.54,295.47-99.43,297.6-95.23l-89.28-214.28-208.32,11.91S1071.35,386.66,1071.13,464.26Z"
                transform="translate(-493.78 0)"
                fill={chest}
            />
            <Path
                d="M1047.32,464.26c.19,66.54-295.47-99.43-297.6-95.23L839,154.75l208.32,11.91S1047.1,386.66,1047.32,464.26Z"
                transform="translate(-493.78 0)"
                fill={chest}
            />
            {/*shoulders */}
            <Path
                d="M1434.2,464.26h53.57c3.11.63-10.65-154-23.8-208.32-9.94-41-80.52-106.82-83.33-101.19h-83.33Z"
                transform="translate(-493.78 0)"
                fill={shoulders}
            />
            <Path
                d="M684.24,464.26H630.68c-3.11.63,10.65-154,23.8-208.32,9.94-41,80.52-106.82,83.33-101.19h83.33Z"
                transform="translate(-493.78 0)"
                fill={shoulders}
            />
            {/*biceps */}
            <Path
                d="M702.1,482.12l-71.42,5.95L595,708.3l65.48-23.81,35.71,77.37S797.33,529.73,797.33,446.41c0-17.92-47.61-53.57-47.61-53.57Z"
                transform="translate(-493.78 0)"
                fill={biceps}
            />
            <Path
                d="M1416.35,482.12l71.42,5.95,35.72,220.23L1458,684.49l-35.71,77.37s-101.18-232.13-101.18-315.45c0-17.92,47.61-53.57,47.61-53.57Z"
                transform="translate(-493.78 0)"
                fill={biceps}
            />
            {/*elbow */}
            <Polygon
                points="946.38 773.77 1017.8 833.29 1017.8 738.06 982.09 714.25 946.38 773.77"
                fill={elbow}
            />
            <Polygon
                points="184.51 773.77 113.09 833.29 113.09 738.06 148.8 714.25 184.51 773.77"
                fill={elbow}
            />
            {/*forearm */}
            <Path
                d="M1547.29,1089.23l29.76-11.91L1511.58,875s-83.33-105.8-83.33-77.37C1428.25,898.76,1547.29,1089.23,1547.29,1089.23Z"
                transform="translate(-493.78 0)"
                fill={forearm}
            />
            <Polygon
                points="1095.18 1065.42 1130.89 1059.47 1041.61 761.87 1029.71 863.05 1095.18 1065.42"
                fill={forearm}
            />
            <Path
                d="M571.15,1089.23l-29.76-11.91L606.87,875s83.33-105.8,83.33-77.37C690.2,898.76,571.15,1089.23,571.15,1089.23Z"
                transform="translate(-493.78 0)"
                fill={forearm}
            />
            <Polygon
                points="35.71 1065.42 0 1059.47 89.28 761.87 101.19 863.05 35.71 1065.42"
                fill={forearm}
            />
            {/*neck */}
            <Path
                d="M1142.55,23.81c0,41.66,88.1,113.09,88.1,113.09H1083S1142.55-7.48,1142.55,23.81Z"
                transform="translate(-493.78 0)"
                fill={neck}
            />
            <Polygon
                points="577.35 119.04 637.45 0.77 577.35 0 577.35 119.04"
                fill={neck}
            />
            <Path
                d="M975.9,23.81c0,41.66-88.1,113.09-88.1,113.09h147.62S975.9-7.48,975.9,23.81Z"
                transform="translate(-493.78 0)"
                fill={neck}
            />
            <Polygon
                points="553.54 119.04 493.44 0.77 553.54 0 553.54 119.04"
                fill={neck}
            />
            {/*feet */}
            <Polygon
                points="665.31 2732 814.11 2714.14 778.4 2553.44 665.31 2577.25 665.31 2732"
                fill={feet}
            />
            <Polygon
                points="458.31 2732 309.51 2714.14 345.22 2553.44 458.31 2577.25 458.31 2732"
                fill={feet}
            />
            {/*ankle */}
            <Polygon
                points="671.26 2547.49 724.83 2529.63 772.45 2529.63 760.54 2452.25 671.26 2446.3 671.26 2547.49"
                fill={ankle}
            />
            <Polygon
                points="452.36 2547.49 398.79 2529.63 351.17 2529.63 363.08 2452.25 452.36 2446.3 452.36 2547.49"
                fill={ankle}
            />
            {/*tibialis  */}
            <Path
                d="M1266.22,1964.18l71.43-17.85s-3.73,173.15-11.91,226.18c-10.06,65.27-65.47,255.93-65.47,255.93h-23.81Z"
                transform="translate(-493.78 0)"
                fill={tibialis}
            />
            <Polygon
                points="434.5 2428.44 404.74 2428.44 369.03 1964.18 446.4 1958.23 434.5 2428.44"
                fill={tibialis}
            />
            <Polygon
                points="689.12 2428.44 718.88 2428.44 754.59 1964.18 677.21 1958.23 689.12 2428.44"
                fill={tibialis}
            />
            <Path
                d="M845,1964.18l-71.42-17.85s3.72,173.15,11.9,226.18c10.06,65.27,65.47,255.93,65.47,255.93h23.81Z"
                transform="translate(-493.78 0)"
                fill={tibialis}
            />
            {/*knee*/}
            <Polygon
                points="677.21 1940.38 837.92 1922.52 831.97 1827.29 748.64 1797.53 683.16 1827.29 677.21 1940.38"
                fill={knee}
            />
            <Polygon
                points="446.4 1940.38 285.7 1922.52 291.65 1827.29 374.98 1797.53 440.45 1827.29 446.4 1940.38"
                fill={knee}
            />
            {/* quadriceps */}
            <Path
                d="M862.81,1779.67l-65.48,11.9s-83.33-577.35,0-744c2.75-5.48,23.81-6,23.81-6Z"
                transform="translate(-493.78 0)"
                fill={quadriceps}
            />
            <Polygon
                points="404.74 1130.89 344.81 1055.84 386.88 1773.72 416.64 1785.62 458.31 1404.69 404.74 1130.89"
                fill={quadriceps}
            />
            <Path
                d="M958,1803.48l-29.76-17.86,41.66-363.08s27.33,24.35,29.76,35.72C1017.56,1541.59,958,1803.48,958,1803.48Z"
                transform="translate(-493.78 0)"
                fill={quadriceps}
            />
            <Path
                d="M1248.37,1779.67l65.47,11.9s83.33-577.35,0-744c-2.74-5.48-23.81-6-23.81-6Z"
                transform="translate(-493.78 0)"
                fill={quadriceps}
            />
            <Polygon
                points="718.88 1130.89 778.8 1055.84 736.73 1773.72 706.97 1785.62 665.31 1404.69 718.88 1130.89"
                fill={quadriceps}
            />
            <Path
                d="M1153.13,1803.48l29.77-17.86-41.67-363.08s-27.32,24.35-29.76,35.72C1093.61,1541.59,1153.13,1803.48,1153.13,1803.48Z"
                transform="translate(-493.78 0)"
                fill={quadriceps}
            />
            {/*groin*/}
            <Polygon
                points="611.74 1416.59 641.5 1392.78 689.12 1148.75 599.84 1238.03 611.74 1416.59"
                fill={groin}
            />
            <Polygon
                points="511.88 1416.59 482.12 1392.78 434.5 1148.75 523.78 1238.03 511.88 1416.59"
                fill={groin}
            />
        </Svg>
    );
}
