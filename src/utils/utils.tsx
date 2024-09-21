
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
    stock_quantity: number;
    category: string
};

export type filterTypes = {
    search: string;
    categories: string[];
    minPrice: number | null;
    maxPrice: number | null;
    sortOrder: string | null;
}

export const noNegative = (value: number) => {
    if (value > 0) return Number(value);

    else return 0;
}