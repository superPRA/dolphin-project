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
  loginWn: boolean;
  accountWn: boolean;
  successMassageStatus: boolean;
  users: {
    name: string;
    phone: string;
    pass: string;
    isActive: boolean;
    email: string;
    gender: string;
    birthDay: {
      day: string;
      mounth: string;
      year: string;
    };
  }[];
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
  loginWn: false,
  accountWn: false,
  successMassageStatus: false,
  users: [
    {
      isActive: true,
      name: "پوریا موسوی",
      pass: "13811391",
      phone: "09305306508",
      email: "",
      birthDay: {
        day: "",
        mounth: "",
        year: "",
      },
      gender: "male",
    },
  ],
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
    removePriceReduction: (state) => {
      state.priceReduction = 0;
    },
    setLoginWn: (state, action: PayloadAction<boolean>) => {
      state.loginWn = action.payload;
    },
    setAccountWn: (state, action: PayloadAction<boolean>) => {
      state.accountWn = action.payload;
    },
    addUser: (
      state,
      action: PayloadAction<{
        phone: string;
        pass: string;
        name: string;
        email?: string;
      }>
    ) => {
      state.users.push({
        name: action.payload.name,
        phone: action.payload.phone,
        pass: action.payload.pass,
        isActive: false,
        email: action.payload.email as string,
        birthDay: {
          day: "",
          mounth: "",
          year: "",
        },
        gender: "",
      });
    },
    activateUser: (
      state,
      action: PayloadAction<{ phone: string; pass: string }>
    ) => {
      const i = state.users.findIndex(
        (item) => item.phone === action.payload.phone
      );
      if (state?.users[i].pass === action.payload.pass) {
        for (let j = 0; j < state.users.length; j++) {
          state.users[j].isActive = false;
        }
        state.users[i].isActive = true;
      }
    },
    logOut: (state) => {
      state.users.map((item) => {
        item.isActive = false;
      });
    },
    updateUser: (
      state,
      action: PayloadAction<{
        phone: string;
        email: string;
        gender: string;
        name: string;
        birthday:{
          day: string;
        mounth: string;
        year: string
        }
        pass: string
      }>
    ) => {
      const i = state.users.findIndex(
        (user) => user.phone === action.payload.phone
      );
      state.users[i].birthDay = {
        day: action.payload.birthday.day,
        mounth: action.payload.birthday.mounth,
        year: action.payload.birthday.year,
      };
      state.users[i].email = action.payload.email;
      state.users[i].gender = action.payload.gender;
      state.users[i].name = action.payload.name;
      state.users[i].pass = action.payload.pass
    },
    setSuccessMassage: (state, action: PayloadAction<boolean>) => {
      state.successMassageStatus = action.payload;
    },
  },
});

export const {
  setFilterInput,
  setSaleCode,
  removePriceReduction,
  setLoginWn,
  addUser,
  activateUser,
  setAccountWn,
  logOut,
  updateUser,
  setSuccessMassage,
} = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cart.orders;

export default counterSlice.reducer;
