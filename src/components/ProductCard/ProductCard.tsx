import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    item: any;
    horizontal?: boolean;
};

const ProductCard = (props: Props) => {

    const { item, horizontal } = props;
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Card
                sx={{
                    cursor: "pointer",
                    padding: "0.1rem",
                    width: {
                        xs: "16rem",
                        md: Boolean(horizontal) ? "fit-content" : "16rem",
                    },
                    display: {
                        xs: "flex",
                        md: Boolean(horizontal) ? "grid" : "flex",
                    },
                    gridTemplateColumns: {
                        md: Boolean(horizontal) ? "16rem auto" : "16rem",
                    },
                    gridTemplateRows: {
                        md: Boolean(horizontal) ? "auto auto" : "15rem auto auto",
                    },
                    flexDirection: { xs: "column", md: Boolean(horizontal) ? "row" : "column" },
                    "&:hover #imgbtn": {
                        display: "block"
                    }
                }}
                raised
                className=" shadow-none bg-transparent"
            >
                <CardMedia
                    component="div"
                    sx={{
                        position: "relative",
                        gridColumnEnd: "span 1",
                        gridRowEnd: { md: Boolean(horizontal) ? "span 2" : "span 1" },
                    }}

                >
                    <img
                        src={
                            item.images.length > 0
                                ? `${item?.images[0]}`
                                : "https://i.ibb.co/PrxWFNt/facewash.png"
                        }
                        alt={item.name}
                        style={{
                            objectFit: "contain",
                            maxHeight: "15rem",
                            maxWidth: "16rem",
                            margin: Boolean(horizontal) ? "" : "auto",
                        }}
                    />

                    {
                        <div id="imgbtn" className="hidden hover:block absolute bottom-0 w-full">
                            <div className="flex w-full">
                                <button onClick={() => { navigate(`/product_details/${item?._id}`) }} className=" bg-green-400 text-white hover:bg-green-700 border-black bg-opacity-80 py-3 px-3 w-full">SEE DETAILS</button>
                            </div>
                        </div>
                    }


                    {

                        item?.stock_quantity <= 0 &&
                        <div className="absolute top-1/2 w-full">
                            <div className="w-full bg-red-600 opacity-80 text-white py-3">
                                <Typography className=" text-center capitalize">Out of Stock</Typography>
                            </div>
                        </div>
                    }
                </CardMedia>

                <CardContent
                    className="py-4 pb-0 flex flex-col gap-y-2"
                >

                    <section
                        className="flex gap-x-4 items-center justify-self-end"
                    >
                        <Typography className="text-lg">৳ {item.price}</Typography>
                    </section>

                    <Typography
                        className="font-bold flex-wrap"
                    >
                        {item.name}
                    </Typography>

                </CardContent>

            </Card>
        </React.Fragment>
    )
}

export default ProductCard
