import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    configData: null, language: "", countryCode: "",
};

// Action creators are generated for each case reducer function
export const configDataSlice = createSlice({
    name: "config-data", initialState, reducers: {
        setConfigData: (state, action) => {
            state.configData = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setCountryCode: (state, action) => {
            state.countryCode = action.payload;
        },
    },
});

export const {setConfigData, setCountryCode,setLanguage} = configDataSlice.actions;

export default configDataSlice.reducer;
