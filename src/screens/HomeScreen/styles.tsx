import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2C3E50',
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 5, 
        borderColor: 'transparent',
        padding: 5
    },
    selectedTab: {
        borderColor: '#FFA500', // Change to desired color when tab is selected
    },
    tabText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff', // Change to desired text color
    },
    placeholder: {
        height: 100, 
        backgroundColor: '#f0f0f0', 
        marginVertical: 5, 
    }
});