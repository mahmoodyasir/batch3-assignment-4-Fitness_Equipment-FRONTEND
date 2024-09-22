import React from 'react';
import { Grid, Card, Typography, Button, Avatar } from '@mui/material';
import 'aos/dist/aos.css';
import AOS from 'aos';

const AboutUs = () => {

  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-300 via-indigo-500 to-purple-600 min-h-screen p-8">
      {/* Company Overview Section */}
      <section data-aos="fade-up" className="text-center mb-16">
        <Typography variant="h3" className="text-white font-bold mb-4">
          Our Company
        </Typography>
        <Typography className="text-gray-200 text-lg">
          Founded in [Year], our mission is to [Your Mission Statement]. We envision a future where [Your Vision].
        </Typography>
      </section>

      {/* Team Introduction Section */}
      <section data-aos="fade-up" className="mb-16">
        <Typography variant="h4" className="text-white font-semibold text-center mb-8">
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="hover:shadow-lg hover:scale-105 transition-transform p-4 bg-white">
                <Avatar src={member.image} alt={member.name} className="w-32 h-32 mx-auto mb-4" />
                <Typography variant="h6" className="text-center">{member.name}</Typography>
                <Typography className="text-center text-gray-600">{member.role}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* Customer Testimonials Section */}
      <section data-aos="fade-up" className="mb-16">
        <Typography variant="h4" className="text-white font-semibold text-center mb-8">
          What Our Customers Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card className="bg-white p-6 shadow-lg">
                <Typography className="text-gray-800 mb-2">{testimonial.text}</Typography>
                <Typography className="font-semibold text-gray-600">{testimonial.name}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* Contact Information Section */}
      <section data-aos="fade-up" className="text-center">
        <Typography variant="h4" className="text-white font-semibold mb-4">
          Get in Touch
        </Typography>
        <Typography className="text-gray-200 mb-6">We would love to hear from you! Feel free to reach out with any questions or feedback.</Typography>
        <Button 
          variant="contained" 
          className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4"
        >
          Contact Us
        </Button>
      </section>
    </div>
  );
};

// Sample Data for Team and Testimonials
const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: 'https://i.ibb.co.com/fvLTQSW/p.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image: 'https://i.ibb.co.com/xq3wHyZ/vector1.jpg',
  },
  {
    name: 'Emily Johnson',
    role: 'Marketing Head',
    image: 'https://i.ibb.co.com/Qb5YKth/tony.png',
  },
];

const testimonials = [
  {
    text: 'This company has provided us with excellent service. We couldn’t be happier with the results!',
    name: 'Customer A',
  },
  {
    text: 'Highly recommend! Their team is professional and exceeded our expectations.',
    name: 'Customer B',
  },
];

export default AboutUs;
