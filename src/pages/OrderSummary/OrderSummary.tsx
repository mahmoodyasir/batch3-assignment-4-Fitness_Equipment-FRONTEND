import { Cancel, RemoveOutlined, AddOutlined } from "@mui/icons-material";
import { Typography, IconButton, ButtonGroup, Divider, Button, styled, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { Fragment, useState } from "react";

import { useDispatch } from "react-redux";
import { increaseCartItem, decreaseCartItem, removeFromCart, CartState } from "../../Redux/features/productCartSlice";

const QuantityButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    opacity: 1,
    '&:disabled': {
        backgroundColor: 'transparent',
        color: 'black',
        border: 0,
    },
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'black',
    },
}));

type Props = {
    header?: JSX.Element;
    cart: CartState;
    disableItemUpdate?: boolean;
    footerElement?: JSX.Element;
}

function OrderSummary(props: Props) {
    const { header, cart, disableItemUpdate, footerElement } = props;

    const [open, setOpen] = useState(false);
    const [currentKey, setCurrentKey] = useState<string>("");

    const dispatch = useDispatch();

    const handleIncreaseQuantity = (productId: string) => {
        dispatch(increaseCartItem(productId));
    };

    const handleDecreaseQuantity = (productId: string) => {
        dispatch(decreaseCartItem(productId));
    };

    const handleRemoveFromCart = (productId: string) => {
        dispatch(removeFromCart(productId));
    };


    return (
        <main>
            {header}
            <>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to remove this item ? "}
                    </DialogTitle>

                    <DialogActions>
                        <Button variant="outlined" color="success" onClick={() => {
                            handleRemoveFromCart(currentKey);
                            setOpen(false);
                        }}>
                            Proceed
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => { setOpen(false) }}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </>
            <section style={{ backgroundColor: "rgb(249 250 251)" }} >
                {
                    Object.entries(cart).map(([key, value], index) => (
                        <Fragment key={index} >

                            <section style={{ display: "flex", alignItems: "center", padding: "1rem", paddingLeft: `${disableItemUpdate ? "1rem" : 0}` }} >
                                {
                                    !disableItemUpdate &&
                                    <IconButton onClick={() => {
                                        setCurrentKey(key);
                                        setOpen(true);
                                    }} >
                                        <Cancel fontSize='large' sx={{ padding: 0 }} />
                                    </IconButton>
                                }

                                <article style={{ width: "12rem" }} >
                                    <img src={value.product.images.length > 0 ?
                                        `${value.product.images[0]}` :
                                        "https://i.ibb.co.com/8xBYtXv/depositphotos-247872612-stock-illustration-no-image-available-icon-vector.webp"}
                                        style={{ objectFit: "contain" }}
                                    />
                                </article>

                                <article style={{ width: "15rem", display: "flex", flexFlow: "column wrap", gap: "0.5rem 0", marginLeft: "1rem" }} >
                                    <Typography >
                                        <b>{value.product.name}</b>
                                    </Typography>
                                    <Typography >
                                        <b>Price: </b>৳ {value.product.price}
                                    </Typography>

                                    {
                                        disableItemUpdate ?
                                            <Typography ><b>Qty: </b>{cart[String(key)]?.quantity || 0}</Typography> :
                                            <section style={{ display: "flex", alignItems: "center", gap: "0 0.5rem" }} >
                                                <Typography ><b>Qty:</b></Typography>

                                                <ButtonGroup sx={{ backgroundColor: "white", borderRadius: "1rem", width: "100%" }} >
                                                    <IconButton onClick={() => handleDecreaseQuantity(key)}><RemoveOutlined /></IconButton>
                                                    <QuantityButton fullWidth disabled>
                                                        {cart[String(key)]?.quantity || 0}
                                                    </QuantityButton>
                                                    <IconButton onClick={() => handleIncreaseQuantity(key)}><AddOutlined /></IconButton>
                                                </ButtonGroup>
                                            </section>
                                    }

                                    <Typography >
                                        <b>Total: </b>৳ {value.total_price}
                                    </Typography>
                                </article>
                            </section>

                            <Divider sx={{ borderWidth: "1px", borderColor: "#aaaaaa", margin: "0 1rem" }} />

                        </Fragment>
                    ))
                }
            </section>
            {footerElement}
        </main>
    )
}


export default OrderSummary;