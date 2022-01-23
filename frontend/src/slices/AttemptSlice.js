import { createSlice } from '@reduxjs/toolkit'

export const AttemptSlice = createSlice({
  name: 'attempts',
  initialState: {
    value: [],
  },
  reducers: {
    addAttempt: (state, action) => {
      state.value.push(action.payload);
    },
    removeAllAttempts: (state) => {
      state.value = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const {addAttempt, removeAllAttempts } = AttemptSlice.actions

export default AttemptSlice.reducer