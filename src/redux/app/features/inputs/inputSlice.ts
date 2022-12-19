import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface CounterState {
  filterInp: {
    quickSearch: string;
    checkExist: boolean;
  };
  saleCodes: {
    code: string;
    sale: number;
    isActive: boolean;
  }[];
  priceReduction: number;
  loginWn: boolean
}
interface filterInp {
  quickSearch: string;
  checkExist: boolean;
}
type saleCode = string;


const initialState: CounterState = {
  filterInp: {
    quickSearch: "",
    checkExist: false,
  },
  saleCodes: [
    {
      code: "pooriya",
      sale: 0.5,
      isActive: true,
    },
    {
      code: "alireza",
      sale: 0.2,
      isActive: true,
    },
  ],
  priceReduction: 0,
  loginWn: false
};

export const counterSlice = createSlice({
  name: "inp",
  initialState,
  reducers: {
    setFilterInput: (state, action: PayloadAction<filterInp>) => {
      state.filterInp.quickSearch = action.payload.quickSearch;
      state.filterInp.checkExist = action.payload.checkExist;
    },
    setSaleCode: (state, action: PayloadAction<saleCode>) => {
      let i = state.saleCodes.findIndex((item) => item.code === action.payload);
      if (i !== -1 && state.saleCodes[i].isActive) {
        state.priceReduction = state.saleCodes[i].sale;
      }
    },
    removePriceReduction: (state)=>{
      state.priceReduction = 0
    },
    setLoginWn: (state, action: PayloadAction<boolean>)=>{
      state.loginWn = action.payload
    }
  },
});

export const { setFilterInput, setSaleCode, removePriceReduction, setLoginWn } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cart.orders;

export default counterSlice.reducer;
