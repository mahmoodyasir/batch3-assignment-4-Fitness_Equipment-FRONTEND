import { Box, Grid, Typography } from '@mui/material';
import { FitnessCenter, Security, TrendingUp, Home } from '@mui/icons-material';

const benefits = [
    {
        title: 'Durability & Quality',
        description: 'Our equipment is built to last, handling intense use without wearing down.',
        icon: <FitnessCenter className="text-6xl text-white" />,
        imageUrl: 'https://i.ibb.co.com/mhdmXy1/b-1.png',
    },
    {
        title: 'Ergonomics & Safety',
        description: 'Designed with safety in mind to reduce injury risks and ensure maximum comfort.',
        icon: <Security className="text-6xl text-white" />,
        imageUrl: 'https://i.ibb.co.com/sPNvQsY/young-adult-doing-indoor-sport-gym.jpg',
    },
    {
        title: 'Boosts Performance',
        description: 'Enhance your workout performance with equipment made for results.',
        icon: <TrendingUp className="text-6xl text-white" />,
        imageUrl: 'https://i.ibb.co.com/80ggmnB/physical-activity-stats-around-person.jpg',
    },
    {
        title: 'Perfect for Home & Gym',
        description: 'Suitable for both home and commercial gym setups, offering flexibility.',
        icon: <Home className="text-6xl text-white" />,
        imageUrl: 'https://i.ibb.co.com/w42t4Td/full-shot-man-holding-tablet.jpg',
    },
];

const Benefits = () => {
    return (
        <Box className="bg-gray-100 py-16">
            <Typography variant="h4" align="center" className="font-bold text-gray-900 mb-10">
                Why Choose Our Equipment?
            </Typography>

            <Grid container spacing={4} className="px-4 md:px-24">
                {benefits.map((benefit, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} className="flex flex-col items-center text-center">

                        <Box
                            className="relative bg-cover bg-center h-64 w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                            style={{ backgroundImage: `url(${benefit.imageUrl})` }}
                        >

                            <Box className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-lg">

                                <Box className="mb-4">{benefit.icon}</Box>


                                <Typography variant="h6" className="font-semibold text-white mt-4 mb-2">
                                    {benefit.title}
                                </Typography>

                                <Typography className="text-gray-200">{benefit.description}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Benefits;
