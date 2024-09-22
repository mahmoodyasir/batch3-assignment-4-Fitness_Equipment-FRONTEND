import { useEffect, useState } from 'react'
import { BasicInfo } from '../../utils/utils';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import './Checkout.scss'
import { useAppDispatch, useAppSelector } from '../../Redux/app/hooks';
import OrderSummary from '../OrderSummary/OrderSummary';
import { createOrder } from '../../ApiGateways/order';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../Redux/features/productCartSlice';

const Checkout = () => {

    const myCart = useAppSelector((state) => state.cartState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [basicInfo, setBasicInfo] = useState<BasicInfo>({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
    });

    const [totalPrice, setTotalPrice] = useState(0);

    const [deliverMethod, setDeliveryMethod] = useState("");

    const [snackState, setSnackState] = useState<{ open: boolean; vertical: any; horizontal: any }>({
        open: false,
        vertical: 'top',
        horizontal: 'center'
    });

    const { vertical, horizontal } = snackState;

    useEffect(() => {
        const newTotal = Object.keys(myCart).reduce((total, key) => {
            const price = myCart[key]?.total_price || 0;
            return total + price;
        }, 0);
        setTotalPrice(newTotal);
    }, [myCart]);

    const footerElement = (
        <section
            className='block bg-violet-400 text-white py-2 px-4 items-center mt-[-5px]'
        >
            <div className='flex'>
                <Typography variant='h6' >Grand Total: </Typography>
                <Typography variant='h6' ><b>৳ {totalPrice}</b></Typography>
            </div>

        </section>
    );

    const header = (
        <section className='bg-black text-white flex items-center justify-center py-2'>
            <Typography className='text-xl'>Order Summary</Typography>
        </section>
    );


    const formSubmit = (e: any) => {
        e.preventDefault();

        const transformedCart = {
            items: Object.keys(myCart).map(productId => ({
                product: productId,
                quantity: myCart[productId].quantity,
                total_price: myCart[productId].total_price,
            }))
        };

        const finalData = {
            user: {
                name: `${basicInfo?.firstname} ${basicInfo?.lastname}`,
                email: basicInfo?.email,
                phone: basicInfo?.phone,
                delivery_address: basicInfo?.address,
            },
            items: transformedCart?.items
        }

        createOrder(finalData,
            (data) => {
                if (data?.success === true) {
                    setSnackState({ ...snackState, open: true });
                    setTimeout(() => {
                        dispatch(clearCart());
                        navigate('/');
                    }, 1600);
                }
            },
            res => console.log(res)
        )

    }


    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackState?.open}
                autoHideDuration={3000}
                onClose={() => { setSnackState({ ...snackState, open: false }) }}
                key={vertical + horizontal}
            >
                <Alert
                    onClose={() => { setSnackState({ ...snackState, open: false }) }}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Order Successfully Placed !
                </Alert>
            </Snackbar>
            <div className='flex lg:flex-row flex-col'>
                <form onSubmit={formSubmit} className='flex flex-col gap-y-4 w-full px-8 py-8'>

                    <Typography className='text-2xl mb-3'>Shipping Information</Typography>

                    <section className='flex flex-col lg:flex-row justify-between gap-y-4 lg:gap-x-4'>
                        <TextField
                            value={basicInfo.firstname}
                            required
                            fullWidth
                            label="First Name"
                            onChange={(e) => setBasicInfo({ ...basicInfo, firstname: e.target.value })}
                        />

                        <TextField
                            value={basicInfo?.lastname}
                            required
                            fullWidth
                            label="First Name"
                            onChange={(e) => setBasicInfo({ ...basicInfo, lastname: e.target.value })}
                        />
                    </section>

                    <section className='flex flex-col lg:flex-row justify-between gap-y-4 lg:gap-x-4' >
                        <TextField
                            value={basicInfo?.email}
                            fullWidth
                            required
                            type='email'
                            label="Email"
                            onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                        />


                        <TextField
                            value={basicInfo?.phone}
                            fullWidth
                            required
                            type='phone'
                            label="Phone"
                            onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                        />
                    </section>

                    <section className='flex flex-col lg:flex-row justify-between gap-y-4 lg:gap-x-4' >
                        <TextField
                            value={basicInfo?.address}
                            fullWidth
                            required
                            type='text'
                            label="Address"
                            onChange={(e) => setBasicInfo({ ...basicInfo, address: e.target.value })}
                        />

                    </section>

                    <FormControl className='lg:w-1/2 w-full'>
                        <InputLabel id="demo-simple-select-label">Select a Payment method</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={deliverMethod}
                            label="Select a Payment method"
                            onChange={(e) => { setDeliveryMethod(e.target.value) }}
                        >
                            <MenuItem value="cash">Cash on Delivery</MenuItem>
                        </Select>
                    </FormControl>

                    <div className='flex justify-end mt-4'>
                        <Button type='submit' size='large' className='bg-black text-white hover:bg-green-400 hover:opacity-75'>Place Order</Button>
                    </div>

                </form>

                <article className='lg:w-[35rem] w-full'>
                    <OrderSummary header={header} footerElement={footerElement} cart={myCart} disableItemUpdate={true} />
                </article>

            </div>
        </>

    )
}

export default Checkout
