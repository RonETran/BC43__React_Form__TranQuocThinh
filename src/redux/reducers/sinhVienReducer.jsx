import { createSlice } from '@reduxjs/toolkit';
import { getStorageJSON,ARR_STUDENT } from '../../util/config';

const arrStorage = () => {
  let arrStudentStore = [];
  if (getStorageJSON(ARR_STUDENT)) {
    arrStudentStore = getStorageJSON(ARR_STUDENT);
  }
  return arrStudentStore;
}

const checkValid = (state) => {
  let valid = true;
  for(let key in state.errors){
    if(state.errors[key] !== '' || state.student[key] === ''){
        valid = false;
    }
  }
  state.valid = valid
}

const initialState = {
    arrStudent: arrStorage(),
    student: {maSV:'', hoTen:'', soDienThoai:'', email:''},
    errors: {maSV:'', hoTen:'', soDienThoai:'', email:''},
    searchTerm:'',
    valid: false,
    flag:false
}

const sinhVienReducer = createSlice({
  name: 'sinhVienReducer',
  initialState,
  reducers: {
    changeInfo: (state,action) => {
      let {values,errors} = action.payload;
      state.student = values;
      state.errors = errors;
      checkValid(state)
    },

    addStudent: (state,action) => {
      const student =  {...action.payload};
      state.arrStudent.push(student);
      let stringStudent = JSON.stringify(state.arrStudent);
      localStorage.setItem(ARR_STUDENT, stringStudent);
      for (let key in state.student) {
        state.student[key] = '';
      };
      state.valid = false;
    },

    delStudent: (state,action) => {
      let id = action.payload;
      let indexDel = state.arrStudent.findIndex(stu => stu.maSV === id);
      if (indexDel !== -1) {
        state.arrStudent.splice(indexDel,1);
      }
    },

    editStudent: (state,action) => {
      let id = action.payload;
      let stuEdit = state.arrStudent.find(stu => stu.maSV === id); 
      state.student = stuEdit;
      state.flag = true;
      state.valid = false;
    },

    updateStudent: (state,action) => {
      let student = {...action.payload};
      let stuUpdate = state.arrStudent.find(stu => stu.maSV === student.maSV);
      stuUpdate = student;
      state.arrStudent.splice(stuUpdate.maSV-1,1,stuUpdate);
      for (let key in state.student) {
        state.student[key] = '';
      };
      state.flag = false;
      state.valid = false;
    },

    searchStudent: (state,action) => {
      state.searchTerm = action.payload;
    } 
    
    
  }
});

export const {changeInfo,addStudent,delStudent,editStudent,updateStudent,searchStudent} = sinhVienReducer.actions

export default sinhVienReducer.reducer