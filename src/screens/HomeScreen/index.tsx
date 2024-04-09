import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { RaceItem } from '../../containers';
import { useDispatch } from 'react-redux';
import { getAPIData } from '../../services/functions';
import { setRaces as setRaceData } from '../../services/redux/reducers/races';
import { GreyhoundRacingIcon, HorseRacingIcon, LogoImage } from '../../assets';
import styles from './styles';
import { Race } from '../../assets';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState<string>('9daef0d7-bf3c-4f50-921d-8e818c60fe61');
    const [races, setRaces] = useState<any>(null);

    const fetchData = async () => {
        try {
            const apiData = await getAPIData();
            dispatch(setRaceData(apiData));
            setRaces(apiData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);    

    // Filter and sort races based on selected category and start time and display only the next 5 races
    const nextFiveRacesSortedRaces = races?.next_to_go_ids
        ?.map((raceId: string) => races.race_summaries[raceId])
        .filter((race: Race) => selectedCategory ? race.category_id === selectedCategory : true)
        .sort((a: any, b: any) => new Date(a.advertised_start).getTime() - new Date(b.advertised_start).getTime())
        .slice(0, 5);

    const handleTabPress = async (category: string) => {
        setSelectedCategory(category);
    };

    const handleExpiry = (updatedRacesList: any) => {
        setRaces(updatedRacesList);
    };
    
    return (
        <CustomSafeAreaView>
            <Image source={LogoImage} style={{width:110, height: 25, margin: 5, marginBottom: 10}} />
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.tab, selectedCategory === '9daef0d7-bf3c-4f50-921d-8e818c60fe61' && styles.selectedTab]}
                    onPress={() => handleTabPress('9daef0d7-bf3c-4f50-921d-8e818c60fe61')}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={GreyhoundRacingIcon} style={{width: 20, height: 20, marginRight: 5}}/>
                        <Text style={styles.tabText}>
                            Greyhound Racing
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, selectedCategory === '161d9be2-e909-4326-8c2c-35ed71fb460b' && styles.selectedTab]}
                    onPress={() => handleTabPress('161d9be2-e909-4326-8c2c-35ed71fb460b')}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 3}}>
                        <Text style={styles.tabText}>
                            Harness Racing
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, selectedCategory === '4a2788f8-e825-4d36-9894-efd4baf1cfae' && styles.selectedTab]}
                    onPress={() => handleTabPress('4a2788f8-e825-4d36-9894-efd4baf1cfae')}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={HorseRacingIcon} style={{width: 20, height: 20, marginRight: 5}}/>
                        <Text style={styles.tabText}>
                            Horse Racing
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* Display next 5 races */}
            {nextFiveRacesSortedRaces && (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={nextFiveRacesSortedRaces}
                    renderItem={(item: any) => (
                        <RaceItem race={item} onRaceExpiry={handleExpiry} />
                    )}
                    keyExtractor={(item) => item.race_id}
                />
            )}
        </CustomSafeAreaView>
    );
};

export default HomeScreen;