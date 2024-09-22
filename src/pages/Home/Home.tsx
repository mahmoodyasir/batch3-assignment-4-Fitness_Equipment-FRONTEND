import { useContext, useEffect, useState } from "react";
import Banner from "./Banner/Banner"
import CategorySection from "./CategorySection/CategorySection"
import { Context } from "../../state/Provider";
import { getAllProduct } from "../../ApiGateways/product";
import { ITEM_PER_PAGE, MAX_PRICE_LIMIT, Product } from "../../utils/utils";
import FeaturedCard from "./FeaturedCard/FeaturedCard";
import Benefits from "./Benefits/Benefits";
import MosaicView from "./MosaicView/MosaicView";


const Home = () => {

    const { filters, setFilters } = useContext(Context);

    const [featured, setFeatured] = useState<Product[]>([]);

    const tempFilter = {
        search: '',
        categories: [],
        minPrice: 0,
        maxPrice: MAX_PRICE_LIMIT,
        sortOrder: ""
    }

    const bannerData = [
        {
            imgUrl: "https://i.ibb.co.com/2q0BZTj/1.jpg", path: "/products", buttonText: "Shop Now",
            carouselText: "Unleash your strength, conquer every set"
        },
        {
            imgUrl: "https://i.ibb.co.com/0n8k9pD/2.jpg", path: "/products", buttonText: "Shop Now",
            carouselText: "Elevate your grind, reach new heights"
        },
        {
            imgUrl: "https://i.ibb.co.com/SJ2dR27/3.jpg", path: "/products", buttonText: "Shop Now",
            carouselText: "Discover power within, transform today"
        },
    ];


    useEffect(() => {
        setFilters({ ...filters, categories: [] });
    }, [])

    useEffect(() => {
        getAllProduct(1, ITEM_PER_PAGE, true, tempFilter,
            (data) => {
                const value = data?.data?.data;
                const featuredProducts = value?.filter((product: Product) => product?.featured === true);
                setFeatured(featuredProducts);
            },
            (res) => console.log(res)
        )
    }, [])


    return (
        <div className='flex flex-col gap-12 mb-8'>
            <Banner items={bannerData} />
            <CategorySection />
            <FeaturedCard message="Featured Products" data={featured} />
            <Benefits />
            <MosaicView />
        </div>
    )
}

export default Home
