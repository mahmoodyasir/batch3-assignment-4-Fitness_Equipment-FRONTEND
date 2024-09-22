import { useEffect, useState } from 'react'
import { useAppSelector } from '../../Redux/app/hooks';
import { Button, Typography } from '@mui/material';
import OrderSummary from '../OrderSummary/OrderSummary';
import { useNavigate } from 'react-router-dom';

const ProductCart = () => {

    const myCart = useAppSelector((state) => state.cartState);

    const navigate = useNavigate();

    const [totalPrice, setTotalPrice] = useState(0);

    const footerElement = (
        <section
            className='block sm:flex gap-2 bg-violet-400 text-white py-2 px-4 items-center justify-between mt-[-5px]'
        >
            <div className='flex'>
                <Typography variant='h6' >Grand Total: </Typography>
                <Typography variant='h6' ><b>৳ {totalPrice}</b></Typography>
            </div>

            <div>
                <Button onClick={() => {navigate('/checkout')}} className='bg-black text-white hover:bg-green-400 hover:opacity-70'>Proceed to checkout</Button>
            </div>
        </section>
    );

    const header = (
        <section className='bg-black text-white flex items-center justify-center py-2'>
            <Typography>Cart Items</Typography>
        </section>
    )

    useEffect(() => {
        const newTotal = Object.keys(myCart).reduce((total, key) => {
            const price = myCart[key]?.total_price || 0;
            return total + price;
        }, 0);
        setTotalPrice(newTotal);
    }, [myCart]);

    return (
        <div className=' flex justify-center'>
            <div className='xl:w-2/5 lg:w-3/5 w-full mt-4'>
                <OrderSummary header={header} footerElement={footerElement} cart={myCart} />
            </div>

        </div>
    )
}

export default ProductCart
