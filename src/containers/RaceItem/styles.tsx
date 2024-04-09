import { StyleSheet } from "react-native";

export default StyleSheet.create({
    raceContainer: {
        backgroundColor: '#21303E',
        paddingVertical: 25,
        paddingHorizontal: 10,
        elevation: 3,
        borderTopColor: '#fff',
        borderBottomWidth: 0.2,
        borderBottomColor: '#ffff'
    },
    raceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    timerText: {
        fontSize: 30, 
        fontWeight: '800', 
        color: '#fff',
        textAlign: 'center'
    },
    timerNumber: {
        borderRadius: 3, 
        paddingHorizontal: 15,
        textAlign: 'center'
    },
    timerSub: {
        fontSize: 10,
        color: '#fff',
        textAlign: 'center'
    }
})