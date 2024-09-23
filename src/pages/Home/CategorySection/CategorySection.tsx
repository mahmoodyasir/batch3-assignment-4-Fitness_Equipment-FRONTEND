import { useContext } from 'react'
import barbell from '../../../static/img/barbell.png'
import bench from '../../../static/img/bench.png'
import dumbbells from '../../../static/img/dumbbells.png'
import elliptical from '../../../static/img/elliptical.png'
import pulley from '../../../static/img/pulley.png'
import treadmill from '../../../static/img/treadmill.png'
import { Typography } from '@mui/material'
import { Context } from '../../../state/Provider'
import { useNavigate } from 'react-router-dom'

type categoryDataType = {
    imgSrc: any;
    title: string;
}

const CategorySection = () => {

    const { filters, setFilters } = useContext(Context);

    const navigate = useNavigate();

    const categoryData: categoryDataType[] = [
        { imgSrc: pulley, title: "cable machines" },
        { imgSrc: dumbbells, title: "dumbbells" },
        { imgSrc: elliptical, title: "elliptical" },
        { imgSrc: treadmill, title: "treadmill" },
        { imgSrc: barbell, title: "barbell" },
        { imgSrc: bench, title: "bench" },
    ];

    const handleCategory = (value: string) => {
        setFilters({ ...filters, categories: [...filters.categories, value] });
        navigate('/products');
    }

    return (
        <main>
            <div className='text-center'>
                <Typography className='md:text-2xl text-xl font-sans font-semibold'>Categories</Typography>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {
                    categoryData?.map((item, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            onClick={() => { handleCategory(item?.title) }}
                        >
                            <img
                                src={item?.imgSrc}
                                alt={item?.title}
                                className="w-24 h-24 object-contain mb-4"
                            />
                            <h3 className="text-lg font-semibold capitalize">{item.title}</h3>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default CategorySection
