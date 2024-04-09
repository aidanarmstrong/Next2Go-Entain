import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator(); 

const Navigation = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="HomeScreen"
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    )
}
const mapStateToProps = (state: any) => {
    return {
        races: state.races // Assuming you have a races reducer in your Redux store
    };
}

export default connect(mapStateToProps) (Navigation);