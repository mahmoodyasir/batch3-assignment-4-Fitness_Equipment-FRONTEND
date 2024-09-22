import { useEffect, useState } from 'react';
import { Grid, Card, Typography, Button, Avatar, TextField } from '@mui/material';
import 'aos/dist/aos.css';
import AOS from 'aos';

const AboutUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const teamMembers = [
    {
      name: 'Abdullah Al Mahmood Ysir',
      role: 'CEO & Founder',
      image: 'https://scontent.fdac146-1.fna.fbcdn.net/v/t39.30808-6/454205135_3876597815903717_1898285897698696543_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFKhQen9ojTBPNyIAPYL6dkmi_Mozut8_eaL8yjO63z9wTL6MaYdzfQH27DzvRgcKT0ziLBaslLhfukShC5wO9u&_nc_ohc=-zUte2AW5AMQ7kNvgHaPxTX&_nc_ht=scontent.fdac146-1.fna&_nc_gid=AFucIC8D4drt2BYdpBqppA0&oh=00_AYAlCLJ3855h8ptuWojoj_YhT50o0sf22Yl5kikROnqeSA&oe=66F63E83',
    },
    {
      name: 'Sakib Islam',
      role: 'CTO',
      image: 'https://i.ibb.co.com/xq3wHyZ/vector1.jpg',
    },
    {
      name: 'Ashiqur Rahman',
      role: 'Marketing Head',
      image: 'https://i.ibb.co.com/Qb5YKth/tony.png',
    },
  ];

  const testimonials = [
    {
      text: 'This company has provided us with excellent service. We are happy !',
      name: 'Amirul Azmi',
      image: 'https://i.ibb.co.com/7SKpmyG/c-man.jpg',
    },
    {
      text: 'Highly recommend! Their team is professional and exceeded our expectations.',
      name: 'Khabib',
      image: 'https://i.ibb.co.com/fvLTQSW/p.jpg',
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ name, email, message });
    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 via-indigo-500 to-purple-600 min-h-screen p-8">
      <section data-aos="fade-up" className="text-center mb-16">
        <Typography variant="h3" className="text-white font-bold mb-4">
          FitGym Innovations
        </Typography>
        <Typography className="text-gray-200 text-lg">
          At FitGym Innovations, we believe that fitness is not just a lifestyle—it's a journey towards a healthier, stronger you. Founded in 2010, our mission has always been to provide high-quality, innovative gym equipment that empowers individuals to reach their fitness goals. With over a decade of experience in the industry, we have established ourselves as a trusted partner for both home gym enthusiasts and professional fitness facilities.
          Our vision is to inspire a global community to embrace fitness and well-being by making state-of-the-art equipment accessible to everyone. We are committed to combining functionality with cutting-edge design, ensuring that our products enhance your workout experience while also looking great in your space.
        </Typography>
      </section>

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

      <section data-aos="fade-up" className="mb-16">
        <Typography variant="h4" className="text-white font-semibold text-center mb-8">
          What Our Customers Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card className="bg-white p-4 shadow-lg flex items-center">
                <Avatar src={testimonial.image} alt={testimonial.name} className="w-16 h-16 mr-4" />
                <div>
                  <Typography className="font-semibold text-gray-800">{testimonial.name}</Typography>
                  <Typography className="text-gray-600">{testimonial.text}</Typography>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      <section data-aos="fade-up" className="text-center">
        <Typography variant="h4" className="text-white font-semibold mb-4">
          Get in Touch
        </Typography>
        <Typography className="text-gray-200 mb-6">We would love to hear from you! Feel free to reach out with any questions or feedback.</Typography>
        <form onSubmit={handleSubmit} className="mb-6">
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            className="mb-4 bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Your Email"
            variant="outlined"
            type="email"
            className="mb-4 bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Your Message"
            variant="outlined"
            multiline
            rows={4}
            className="mb-4 bg-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4"
          >
            Send Message
          </Button>
        </form>
        {success && <Typography className="text-green-400">Thank you! Your message has been sent.</Typography>}
      </section>
    </div>
  );
};

export default AboutUs;
