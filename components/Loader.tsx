import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { ActivityIndicator } from 'react-native-paper';


const Loader = props => {
    const {loading,...attributes} = props;
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size={50} color="#475ee9"></ActivityIndicator>
                    {/* <LottieView source={require('../assets/animations/dna2.json')} style={{ width: 160, alignSelf: "center" }} autoPlay loop ref={animation => {
                        this.animation = animation;
                    }} /> */}
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#fff',
        height: 110,
        width: 110,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
export default Loader;