import { url } from "../config";
import { filterTypes } from "../utils/utils";


export const getAllProduct = async (
    page: number,
    limit: number,
    body: filterTypes,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {

    try {
        const response = await fetch(`${url}/api/product/all_products?page=${page}&limit=${limit}`,
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
}