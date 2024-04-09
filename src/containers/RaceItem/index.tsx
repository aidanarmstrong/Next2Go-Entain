import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { setRaces } from "../../services/redux/reducers/races";
import { formatElapsedTime } from "../../services/functions";

interface IRaceItemProps {
  race: any;
  onRaceExpiry: (remainingRaces: any) => void; // Add this prop
}

export const RaceItem = ({ race, onRaceExpiry}: IRaceItemProps) => {
  
  const calculateCountdown = useMemo(() => (startTime: number ) => {
    const now = new Date().getTime();
    const raceStart = new Date(startTime * 1000).getTime();
    const countdown = raceStart - now;

    if (countdown <= 0) {
      return 'Race started';
    }

    const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

    return {days, hours, minutes, seconds}
  }, []);

  const races = useSelector((state: any) => state.races);
  const dispatch = useDispatch();

  const [countdown, setCountdown] = useState<any>(() => calculateCountdown(race.item.advertised_start.seconds));
  const [raceStartedTimer, setRaceStartedTimer] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
        // Calculate countdown and update countdown timer
        const currentCountdown = calculateCountdown(race.item.advertised_start.seconds);
        setCountdown(currentCountdown);

        // Check if the race has started
        if (currentCountdown === 'Race started') {
            const raceStartTimestamp = race.item.advertised_start.seconds * 1000;

            // Calculate elapsed time since race start
            const elapsedTime = new Date().getTime() - raceStartTimestamp;
            setRaceStartedTimer(elapsedTime);

            // If 1 minute has passed since the race started
            if (elapsedTime >= 60000) { 
                const remainingRaces = races.next_to_go_ids.filter((id: string) => id !== race.item.race_id);

                const updatedRaces = {
                  ...races,
                  next_to_go_ids: remainingRaces,
                  race_summaries: remainingRaces.reduce((acc:any, id: any) => {
                    acc[id] = races.race_summaries[id];
                    return acc;
                  }, {})
                };

                dispatch(setRaces(updatedRaces));
                onRaceExpiry(updatedRaces);
                clearInterval(intervalId); 
            }
        }
    }, 1000);

    return () => clearInterval(intervalId); 
  }, [race.item.advertised_start.seconds, calculateCountdown, onRaceExpiry]);


  return (
    <>
      <View style={styles.raceContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: '40%'}}>
            <Text style={{fontSize: 15, color: '#fff'}}>{race.item.meeting_name}</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#FFA500'}}>Race {race.item.race_number}</Text>
          </View>

          <View style={{width: '62%'}}>
            {countdown === 'Race started' ? (
              <>
                <Text style={{fontSize: 18, color: '#FFA500', fontWeight: '800', textAlign: 'right'}}>Race Started</Text>
                <Text style={{ fontSize: 10, color: '#FFA500', textAlign: 'right' }}>{formatElapsedTime(raceStartedTimer)}</Text>
              </>
            ) : (
              <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                <View style={styles.timerNumber}>
                  <Text style={styles.timerText}>{countdown.days}</Text>
                  <Text style={styles.timerSub}>Days</Text>
                </View>
                <View style={styles.timerNumber}>
                  <Text style={styles.timerText}>{countdown.hours}</Text>
                  <Text style={styles.timerSub}>Hours</Text>
                </View>
                <View style={styles.timerNumber}>
                  <Text style={styles.timerText}>{countdown.minutes}</Text>
                  <Text style={styles.timerSub}>Minutes</Text>
                </View>
                <View style={styles.timerNumber}>
                  <Text style={styles.timerText}>{countdown.seconds}</Text>
                  <Text style={styles.timerSub}>Seconds</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default RaceItem;
