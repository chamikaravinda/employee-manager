import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import employees from './employeeSlice'

const combinedReducer = combineReducers({
  employees,
});


const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
      const nextState = {
          ...state,
          employees: {
            employees: [...action.payload.employees.employees, ...state.employees.employees]
          }
      }
      return nextState;
  } else {
    return combinedReducer(state, action)
  }
}

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore);