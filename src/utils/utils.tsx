export const MAX_PRICE_LIMIT = 100000;
export const ITEM_PER_PAGE = 6;


type timaStampTypes = {
    createdAt: string;
    updatedAt: string;
};

export interface Product extends timaStampTypes {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    featured?: boolean;
    stock_quantity: number;
    category: string
};

export type filterTypes = {
    search: string;
    categories: string[];
    minPrice: number | null;
    maxPrice: number | null;
    sortOrder: string | null;
};


export type BasicInfo = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
};

export const noNegative = (value: number) => {
    if (value > 0) return Number(value);

    else return 0;
}