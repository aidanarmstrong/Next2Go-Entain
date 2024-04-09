import { configureStore } from '@reduxjs/toolkit'

import racesReducer from '../reducers/races';

const store = configureStore({ 
    reducer: {
        races: racesReducer,
    },
})
export default store;