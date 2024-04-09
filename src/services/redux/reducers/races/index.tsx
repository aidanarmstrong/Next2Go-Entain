import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RacesState {}

const initialState: RacesState = {
  next_to_go_ids: [],
  race_summaries: [],
};

const racesSlice = createSlice({
  name: "races",
  initialState,
  reducers: {
    setRaces: (state, action: PayloadAction<any[]>) => {
      return action.payload;
    },
  },
});

export const { setRaces } = racesSlice.actions;

export default racesSlice.reducer;
