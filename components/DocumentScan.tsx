import React from "react";
import {
    View,
    PermissionsAndroid
} from 'react-native';
import DocumentScanner from "@woonivers/react-native-document-scanner"
import { NavigationScreenProp, NavigationState, withNavigation } from "react-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import RNFS from 'react-native-fs';

interface NavigationParams {
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}
const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
};


class DocumentScan extends React.Component<Props> {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const granted = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Ouvrir l'appareil photo",
              message: '',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
    }

    async onScan(res) {
        ReactNativeHapticFeedback.trigger("notificationSuccess", options);
        const uri = await RNFS.readFile(res.croppedImage, 'base64');  
        let photo = {
            uri : uri,
            data : res
        }      
        this.props.navigation.state.params.onScanned(photo)
        this.props.navigation.goBack()
    }




    render() {
        return (
            <View style={{ height: "100%", flex : 1 }}>
                <DocumentScanner
                    style={{ width: "100%", height: "107%", marginTop: -50 }}
                    onPictureTaken={this.onScan.bind(this)}
                    overlayColor="#7a62ff"
                    enableTorch={false}
                    quality={1}
                    detectionCountBeforeCapture={10}
                    detectionRefreshRateInMS={50}
                />
            </View>
        )
    }
}


export default withNavigation(DocumentScan)