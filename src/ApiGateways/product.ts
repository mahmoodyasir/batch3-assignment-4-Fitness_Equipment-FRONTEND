import { url } from "../config";
import { filterTypes } from "../utils/utils";


export const getAllProduct = async (
    page: number,
    limit: number,
    allItems: boolean,
    body: filterTypes,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {

    try {
        const response = await fetch(`${url}/api/product/all_products?page=${page}&limit=${limit}&allItems=${allItems}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)

            });

        const jsonData = await response.json();
        if (response.status === 200) handleSuccess(jsonData);
        else handleError(jsonData);
    }
    catch (err) {
        handleError(err)
    }
};


export const getProductDetails = async (
    id:string,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {

    try {
        const response = await fetch(`${url}/api/product/product-details/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

        const jsonData = await response.json();
        if (response.status === 200) handleSuccess(jsonData);
        else handleError(jsonData);
    }
    catch (err) {
        handleError(err)
    }
}