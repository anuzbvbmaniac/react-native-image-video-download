import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const MainLayout = () => {
    return (
        <View style={styles.container}>
            <Text>Hello.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }
});

export default MainLayout;
