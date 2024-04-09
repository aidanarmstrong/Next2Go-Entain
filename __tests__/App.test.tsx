/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';
import '@testing-library/jest-native/extend-expect';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { render } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import { Provider } from 'react-redux';
import store from '../src/services/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';


describe('<HomeScreen />', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <Provider store={store}> 
            <HomeScreen />
          </Provider>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  });

  test('displays next 5 races', () => {
    const mockApiData = {
      next_to_go_ids: ['1', '2', '3', '4', '5'],
      race_summaries: {
        '1': { race_id: '1', meeting_name: 'Event 1', race_number: '1', advertised_start: '2024-04-09T12:00:00Z' },
        '2': { race_id: '2', meeting_name: 'Event 2', race_number: '2', advertised_start: '2024-04-09T13:30:00Z' },
        '3': { race_id: '3', meeting_name: 'Event 3', race_number: '3', advertised_start: '2024-04-09T12:06:00Z' },
        '4': { race_id: '4', meeting_name: 'Event 4', race_number: '4', advertised_start: '2024-04-09T12:02:00Z' },
        '5': { race_id: '5', meeting_name: 'Event 5', race_number: '5', advertised_start: '2024-04-09T12:23:00Z' }
      }
    };

    jest.mock('../src/services/functions', () => ({
      getAPIData: jest.fn(() => Promise.resolve(mockApiData))
    }));

    const { getByText } = render(<HomeScreen />);
    expect(getByText('Event 1')).toBeTruthy();
    expect(getByText('Event 2')).toBeTruthy();
    expect(getByText('Event 3')).toBeTruthy();
    expect(getByText('Event 4')).toBeTruthy();
    expect(getByText('Event 5')).toBeTruthy();
  });

});
