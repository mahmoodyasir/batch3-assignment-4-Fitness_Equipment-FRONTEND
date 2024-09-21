import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../utils/utils";


interface ProductResponse {
    data: Product[];
    total_product: number;
    page: number;
    total_page: number;
}

const initialState: ProductResponse = {
    data: [],
    total_product: 0,
    page: 0,
    total_page: 0
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductResponse>) => {
            return action.payload;
        }
    }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;