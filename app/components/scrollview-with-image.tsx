import React from 'react';
import { ScrollView, Image, Dimensions, StatusBar, } from 'react-native';


const { width, height } = Dimensions.get('window');

type Props = {
    children: React.ReactNode;
    imageSource: any;
}

const ImageScrollView: React.FC<Props> = ({ children, imageSource, }) => {

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            style={{ flex: 1 }}
        >
            <Image
                source={imageSource}
                style={{
                    width,
                    height: height * .30 + (StatusBar.currentHeight ?? 0),
                }}
            />
            {
                children
            }
        </ScrollView>
    );
}

export default ImageScrollView;