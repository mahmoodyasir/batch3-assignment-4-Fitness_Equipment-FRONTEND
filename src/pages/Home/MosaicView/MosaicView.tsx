import { Typography } from "@mui/material";

const MosaicView = () => {
    // Full dataset of images
    const images = [
        {
            src: "https://scontent.fdac146-1.fna.fbcdn.net/v/t31.18172-8/22792018_2025161887713995_4654232432776337924_o.jpg?_nc_cat=104&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeHW_6vFUL_4t8foH6M69-FEdoPvNwTiTnp2g-83BOJOenk2TgypS42KpCGCQ3XVl7f3edLJkoQny1osoEloyyIO&_nc_ohc=sV7v1AevZsMQ7kNvgEbW47q&_nc_ht=scontent.fdac146-1.fna&_nc_gid=AsUKSvYST48PHxZo-6k3Nov&oh=00_AYDUFspm1X6YJBztSNsY7yuhA0xnvs7_ASpQy58oCO2HOg&oe=6717BEAC",
            alt: "Image 1"
        },
        {
            src: "https://images.pexels.com/photos/5836941/pexels-photo-5836941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "Image 2"
        },
        {
            src: "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "Image 3"
        },
        {
            src: "https://images.pexels.com/photos/4822235/pexels-photo-4822235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "Image 4"
        },
        {
            src: "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600",
            alt: "Image 5"
        },
        {
            src: "https://images.pexels.com/photos/235990/pexels-photo-235990.jpeg?auto=compress&cs=tinysrgb&w=600",
            alt: "Image 6"
        },
        {
            src: "https://images.pexels.com/photos/1115090/pexels-photo-1115090.jpeg?auto=compress&cs=tinysrgb&w=600",
            alt: "Image 7"
        },
        {
            src: "https://images.pexels.com/photos/36029/aroni-arsa-children-little.jpg?auto=compress&cs=tinysrgb&w=600",
            alt: "Image 8"
        },
        {
            src: "https://images.pexels.com/photos/28540200/pexels-photo-28540200/free-photo-of-outdoor-portrait-of-man-playing-acoustic-guitar.jpeg?auto=compress&cs=tinysrgb&w=600",
            alt: "Image 9"
        },
        {
            src: "https://images.pexels.com/photos/28533424/pexels-photo-28533424/free-photo-of-elderly-man-fishing-in-white-rock-bc-canada.jpeg?auto=compress&cs=tinysrgb&w=600",
            alt: "Image 10"
        },
        {
            src: "https://images.pexels.com/photos/74512/pexels-photo-74512.jpeg?auto=compress&cs=tinysrgb&w=600",
            alt: "Image 11"
        },
        {
            src: "https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "Image 12"
        },
        {
            src: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "Image 13"
        },
        {
            src: "https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg",
            alt: "Image 14"
        },
        {
            src: "https://images.pexels.com/photos/1552248/pexels-photo-1552248.jpeg?auto=compress&cs=tinysrgb&w=600",
            alt: "Image 15"
        },
        {
            src: "https://images.pexels.com/photos/1865131/pexels-photo-1865131.jpeg?auto=compress&cs=tinysrgb&w=600",
            alt: "Image 16"
        }
    ];

    return (
        <div className="p-5 md:p-10">
            <div className=" text-center items-center mb-6">
                <Typography className="text-3xl font-semibold">Image Gallery</Typography>
                <Typography className="text-xl">Our Clients</Typography>
            </div>
            <div className="columns-1 gap-5 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className="w-full object-cover rounded-lg shadow-lg"
                    />
                ))}
            </div>
        </div>
    );
};

export default MosaicView;
