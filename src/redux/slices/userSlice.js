import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  token: null,
  id: null,
  currentDoctor: null,
  currentOutpatient: null,
  waitingRoom: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email
      state.token = action.payload.token
      state.id = action.payload.id
      state.currentDoctor = action.payload.currentDoctor
    },
    removeUser(state) {
      state.email = null
      state.token = null
      state.id = null
      state.currentDoctor = null
      state.currentOutpatient = null
      state.waitingRoom = null
    },
    setCurrentOutpatient(state, action) {
      state.currentOutpatient = action.payload.currentOutpatient
    },
    updateServicingNow(state, action) {
      state.currentDoctor = {
        ...state.currentDoctor,
        servicingNow: action.payload.servicingNow,
      }
    },
    updateWaitingRoom(state, action) {
      state.waitingRoom = action.payload.waitingRoom
    },
  },
})

export const {
  setUser,
  removeUser,
  setCurrentOutpatient,
  updateServicingNow,
  updateWaitingRoom,
} = userSlice.actions
export default userSlice.reducer
