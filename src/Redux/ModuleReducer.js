import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  filds: [],
  moduleData: [],
  Route: [],
  moduleValue:[]
};

export const moduleSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    deleteDataValue: (state,action)=>{
      state.moduleData[action.payload.moduleIndex].data.splice(action.payload.ind,1)
      // state.moduleData[action.payload.moduleIndex].data[action.payload.index] = action.payload.data;

    },
    updateDataValue: (state,action)=>{
      state.moduleData[action.payload.moduleIndex].data[action.payload.index] = action.payload.data;

    },
    addModuleValue: (state,action)=>{
      state.moduleData[action.payload.moduleIndex] = action.payload.modules;
    },
    createRoutes: (state,action) => {
      
    },
    CreateModule: (state,action) => {
      const concat = state.moduleData.concat(action.payload.Obj)
      state.moduleData = concat;
      state.filds = [];
    },
    addFilds: (state, action) => {
      const FormFild = [...state.filds];
      const fildArray = [];
      fildArray.push(action.payload.Data);
      if (FormFild.length > 0) {
        const childrens = FormFild[0].Filds.concat(fildArray);
        const DataObj = {
          moduleName: action.payload.ModuleName,
          Filds: childrens,
        };
        FormFild.pop();
        FormFild.push(DataObj);
      } else {
        const DataObj = {
          moduleName: action.payload.ModuleName,
          Filds: fildArray,
        };
        FormFild.push(DataObj);
      }

      state.filds = FormFild;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createRoutes, CreateModule, addFilds, addModuleValue,updateDataValue,deleteDataValue } = moduleSlice.actions;

export default moduleSlice.reducer;
