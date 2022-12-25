import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface CounterState {
  orders: {
    img: string;
    ingridient: string;
    price: number;
    type: string;
    title: string;
    exist: boolean;
    count: number;
  }[];
  cartOpen: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
  orders: [
    {
      img: "",
      ingridient: "خمیر،سس مخصوص ، پنیر",
      price: 60000,
      type: "پیتزا امریکایی(خمیرضخیم)",
      title: "پیتزا پنیر ضخیم",
      exist: false,
      count: 0,
    },
    {
      img: "https://static.delino.com/Image/Restaurant/Food/p1pw3hke.5ya_560x350.jpg",
      ingridient:
        "ژامبون گوشت ، ژامبون مرغ، قارچ ، فلفل دلمه، زیتون سیاه ، پنیر، سس",
      price: 112000,
      type: "پیتزا امریکایی(خمیرضخیم)",
      title: "پیتزا سوپریم",
      exist: true,
      count: 0,
    },
    {
      img: "https://static.delino.com/Image/Restaurant/Food/auqf4smz.3t2_560x350.jpg",
      ingridient:
        "تکه های سینه مرغ کبابی (گریل) ، گوجه ، قارچ ، زیتون سیاه ، پنیر ، سس",
      price: 109000,
      type: "پیتزا امریکایی(خمیرضخیم)",
      title: "پیتزا ماجیک",
      exist: true,
      count: 0,
    },
  ],
  cartOpen: false
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    orderHandleMinus: (state, action: PayloadAction<string>) => {
      const i = state.orders.findIndex((value) => {
        return value.title === action.payload;
      });
      state.orders[i].count -= 1;
    },
    orderHandlePlus: (state, action: PayloadAction<string>) => {
      const i = state.orders.findIndex((value) => {
        return value.title === action.payload;
      });
      if (state.orders[i].exist) {
        state.orders[i].count += 1;
      }
    },
    deleteCart: (state) => {
      for (let i = 0; i < state.orders.length; i++) {
        state.orders[i].count = 0;
      }
    },
    setCartStatus:(state, action: PayloadAction<boolean>)=>{
      state.cartOpen = action.payload
    }
  },
});

export const { orderHandleMinus, orderHandlePlus, deleteCart, setCartStatus } =
  counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cart.orders;

export default counterSlice.reducer;
