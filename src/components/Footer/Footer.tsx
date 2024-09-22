import { Email, Phone } from '@mui/icons-material';
import { Backdrop, Button, CircularProgress, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Footer = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);



  return (
    <>

      <footer className=' bg-amber-50 pt-12 px-4 md:px-8 lg:px-12 pb-24' >
        {/* <MyAliceChatbot/> */}

        <section className='flex justify-center'>
            <div>
              <Typography className='font-alegreya text-2xl md:text-3xl mb-4' >Subscribe for info on new items, sales and more</Typography>
                  <TextField
                    value={email}
                    type='email'
                    onChange={(event) => setEmail(event.target.value)}
                    fullWidth
                    placeholder="Enter your email address"
                    id="customer-email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email  />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <Button size="medium" className="bg-zinc-700 mb-2 mr-2 py-2 px-6"
                          variant="contained"
                        >
                          Subscribe
                        </Button>
                      ),
                    }}
                    variant="standard"
                />
            </div>
        </section>
            

        <div className='flex flex-wrap justify-between gap-4 mt-12'>

            <section className=' flex flex-col gap-6'>
              <Typography variant='h4' className='font-alegreya whitespace-nowrap'>Account</Typography>
              <button onClick={() => navigate('/user_profile')} className='w-fit'>My Account</button>
              <button onClick={() => navigate('/signin')} className='w-fit'>Login</button>
              <button onClick={() => navigate('/user_profile/my_wishlist')} className='w-fit'>Wishlist</button>
              <button onClick={() => navigate('/product')} className='w-fit'>Shop</button>
            
            </section>

            <section className=' flex flex-col gap-6'>
              <Typography variant='h4' className='font-alegreya whitespace-nowrap'>Quick Links</Typography>
              <button onClick={() => navigate('/about_us')} className='w-fit'>About Us</button>
              <button onClick={() => navigate('/privacy_policy')} className='w-fit'>Privacy Policy</button>
            
            </section>

            <section className='flex flex-col gap-6' >
              <Typography variant='h4' className='font-alegreya' >Need Help?</Typography>
              <Typography><b>Phone:</b> +88 01712345678</Typography>
              <Typography><b>Email:</b> test@gmail.com</Typography>
              <Typography><b>Opening Hours:</b> From 9:00AM To 7:00PM</Typography>
              <div className="flex flex-wrap gap-4">
                <img className="w-28 md:w-40" src="https://i.ibb.co/0jFcVyZ/g-play.png" alt="play-store" />
                <img className="w-28 md:w-40" src="https://i.ibb.co/W2FCfGx/app-store.png" alt="app-store" />
              </div>

            </section>

        </div>
      </footer>
    </>
    
  )
}

export default Footer;