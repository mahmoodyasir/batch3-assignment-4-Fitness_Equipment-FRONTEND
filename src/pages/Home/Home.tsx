import { useContext, useEffect } from "react";
import Banner from "./Banner/Banner"
import CategorySection from "./CategorySection/CategorySection"
import { Context } from "../../state/Provider";


const Home = () => {

    const { filters, setFilters } = useContext(Context);

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

    return (
        <div className='flex flex-col gap-12 mb-8'>
            <Banner items={bannerData} />
            <CategorySection />
        </div>
    )
}

export default Home
