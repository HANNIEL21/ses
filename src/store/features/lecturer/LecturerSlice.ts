// src/features/lecturer/lecturerSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface LecturerState {
    lecturer: any | null
    lecturers: any[]
}

const initialState: LecturerState = {
    lecturer: null,
    lecturers: [],
}

const lecturerSlice = createSlice({
    name: 'lecturer',
    initialState,
    reducers: {
        setLecturer(state, action: PayloadAction<any>) {
            state.lecturer = action.payload
        },
        setLecturers(state, action: PayloadAction<any[]>) {
            state.lecturers = action.payload
        },
    },
})

export const { setLecturer, setLecturers } = lecturerSlice.actions
export default lecturerSlice.reducer
