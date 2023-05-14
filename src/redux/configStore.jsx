import {configureStore} from '@reduxjs/toolkit';
import sinhVienReducer from './reducers/sinhVienReducer';


export const store = configureStore({
    reducer: {
        sinhVienReducer: sinhVienReducer
    }
})