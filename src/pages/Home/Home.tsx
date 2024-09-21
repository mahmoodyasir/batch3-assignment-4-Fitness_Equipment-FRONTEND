import Banner from "./Banner/Banner"


const Home = () => {

    const bannerData = [
        {imgUrl: "https://i.ibb.co.com/2q0BZTj/1.jpg", path: "/product", buttonText: "Shop Now", 
        carouselText: "Unleash your strength, conquer every set"
        },
        {imgUrl: "https://i.ibb.co.com/0n8k9pD/2.jpg", path: "/product", buttonText: "Shop Now",
        carouselText: "Elevate your grind, reach new heights"
        },
        {imgUrl: "https://i.ibb.co.com/SJ2dR27/3.jpg", path: "/product", buttonText: "Shop Now",
        carouselText: "Discover power within, transform today"
        },
      ]

    return (
        <div className='flex flex-col gap-12 mb-8'>
            <Banner items={bannerData} />
        </div>
    )
}

export default Home
