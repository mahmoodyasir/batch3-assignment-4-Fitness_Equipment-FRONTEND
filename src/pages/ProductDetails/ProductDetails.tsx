import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../ApiGateways/product';
import { Product } from '../../utils/utils';
import { Avatar, Button, Divider, Typography } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams();

    const [productData, setProductData] = useState<Product>();
    const [inStock, setInStock] = useState<boolean>(false);

    const [numFiles, setNumFiles] = useState<number>(0);
    const [currentFileIdx, setCurrentFileIdx] = useState<number>(0);

    const [showImage, setShowImage] = useState<boolean>(true);

    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: any) => {
        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        setPosition({ x, y });
    };

    useEffect(() => {
        getProductDetails(String(id),
            (data) => {
                setProductData(data?.data);
                setNumFiles(
                    (data?.data?.images?.length || 0)
                );
                if (data?.data?.price <= 0) setInStock(false)
                else setInStock(true)
            },
            res => console.log(res)
        )
    }, [id]);


    return (
        <main>
            <div
                className="mx-4 my-8 bg-gradient-to-tr from-transparent to-violet-300 rounded-xl flex flex-col md:flex-row flex-wrap gap-x-8"
                style={{ padding: "2rem" }}
            >
                <section className="flex flex-wrap justify-center md:justify-around md:flex-col gap-4 md:w-[4rem] mb-5 md:mb-0">
                    {productData?.images.map((image, index) => (
                        <Avatar
                            className="shadow-xl border-slate-200 border-solid border-2"
                            alt={`${image}`}
                            src={`${image}`}
                            sx={{ width: "4rem", height: "4rem" }}
                            key={index}
                            onClick={() => {
                                setCurrentFileIdx(index);
                                setShowImage(true);
                            }}
                            onMouseEnter={() => {
                                setCurrentFileIdx(index);
                                setShowImage(true);
                            }}
                            onMouseLeave={() => {
                                setCurrentFileIdx(index);
                                setShowImage(true);
                            }}
                        />
                    ))}

                </section>

                {numFiles > 0 && (
                    <section className="md:w-[calc((100%-5rem)*0.4)] mb-5 md:mb-0">
                        {showImage && (
                            <div
                                className="magnify-image-container"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setZoom(1.2)}
                                onMouseLeave={() => setZoom(1)}
                            >
                                <img
                                    src={`${productData?.images[currentFileIdx]}`}
                                    alt="product-image"
                                    style={{
                                        height: "40rem",
                                        objectFit: "contain",
                                        alignSelf: "center",
                                        transform: `scale(${zoom})`,
                                        transformOrigin: `${position.x * 100}% ${position.y * 100
                                            }%`,
                                    }}
                                />
                            </div>
                        )}


                    </section>
                )}

                <div className="flex flex-col gap-y-4 w-full md:w-[calc((100%-5rem)*0.5)]">
                    <Typography className="font-alegreya text-3xl md:text-4xl ">
                        {productData?.name}
                    </Typography>


                    <section className="flex gap-x-2 items-center">
                        <Typography variant="h5">৳ {productData?.price}</Typography>
                        <Typography
                            variant="h6"
                            style={{
                                backgroundColor: inStock ? "#4d7c0f" : "#c2410c",
                                padding: "0.15rem 1rem",
                                borderRadius: "0.5rem",
                                color: "white",
                            }}
                        >
                            {inStock ? "In Stock" : "Out of Stock"}
                        </Typography>
                    </section>

                    <div className='flex flex-col gap-3'>
                        <span className='flex gap-4'>
                            <Typography className=" font-semibold text-xl bg-blue-500 p-2 rounded text-white">Stock Quantity </Typography>
                            <span className='text-xl font-bold'>:</span>
                            <Typography className='text-2xl'>{productData?.stock_quantity}</Typography>
                        </span>

                        <span className='flex gap-4'>
                            <Typography className=" font-semibold text-xl bg-blue-500 p-2 rounded text-white">Category </Typography>
                            <span className='text-xl font-bold'>:</span>
                            <Typography className='text-2xl'>{productData?.category}</Typography>
                        </span>
                    </div>

                    <div className='mt-8'>
                        <Button className='bg-red-500 text-white opacity-80 hover:bg-green-500'>Add To Cart</Button>
                    </div>

                    <Divider sx={{ borderWidth: "0.1rem", borderColor: "#AAAAAA" }} />

                    <Typography className=" text-lg text-gray-900 font-semibold">
                        {productData?.description}
                    </Typography>



            

                    {/* {
                        inStock &&
                        <section className=" flex flex-col md:flex-row md:items-center flex-wrap gap-4">
                            <div>
                                <Button className="  bg-red-500 text-white hover:bg-red-700 border-black bg-opacity-80 py-3 px-3"
                                    variant="contained"
                                    onClick={() => buyNow(productData, 1)}
                                    sx={{
                                        height: "fit-content",
                                    }}
                                >
                                    Buy Now
                                </Button>
                            </div>
                            <div>{productData && <AddCartButton data={productData} />}</div>
                        </section>

                    } */}
                </div>
            </div>
        </main>
    )
}

export default ProductDetails
