import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees: []
}

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    getEmployees: (state, action) => {
        state.employees = [...state.employees, action.payload]
    }
  }
})

export const { getEmployees } = employeeSlice.actions

export default employeeSlice.reducer