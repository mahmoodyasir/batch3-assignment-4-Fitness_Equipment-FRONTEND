import React, { useContext, useState } from "react";

import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { TfiWrite } from "react-icons/tfi";
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Badge, Button, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import SearchBar from "../SearchBar/SearchBar";
import { Context } from "../../../state/Provider";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const { searchDrawer, setSearchDrawer, } = useContext(Context);

  const [isMenu, setIsMenu] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setSearchDrawer(newOpen);
  };

  const tabBar = [
    { name: "HOME", icon: <AiOutlineHome />, url: "/" },
    { name: "PRODUCTS", icon: <FiShoppingBag />, url: "/products" },
    { name: "PRODUCT MANAGEMENT", icon: <TfiWrite />, url: "/blog" },
    { name: "ABOUT US", icon: <InfoIcon />, url: "/about_us" },
  ];

  return (
    <React.Fragment>
      <AppBar className="sticky z-2000">
        <section className="block md:hidden"></section>

        <Toolbar className="hidden sm:flex flex-row gap-12 justify-between content-center items-center bg-white">

          <section className="flex gap-1 items-center ">
            <Typography className="text-black text-nowrap">My GYM</Typography>
            {/* <img className=" hover:cursor-pointer" src={Logo}  onClick={() => navigate("/")}/> */}
          </section>

          <SearchBar />

          <section className="flex gap-8 justify-center content-center items-center">
            <Badge badgeContent={0} color="secondary" showZero>
              <ShoppingCartOutlined
                fontSize="large"
                className="text-rose-900 hover:cursor-pointer"
                onClick={() => { }}
              />
            </Badge>

          </section>
        </Toolbar>


        <Toolbar className="flex sm:hidden gap-1 items-center justify-between content-center bg-white">
          <Typography
            className="text-rose-900 text-2xl lg:text-3xl font-bold hover:cursor-pointer sm:hidden"
            onClick={() => setIsMenu(true)}
          >
            <AiOutlineMenu />
          </Typography>

          <section className="flex gap-[0.1rem] min-[380px]:gap-1 items-center md:w-[20rem] lg:w-[15rem]">
            {/* <img src={Logo} className=" hover:cursor-pointer" style={{ maxHeight:50 }} onClick={() => navigate("/")}/> */}
            <Typography className="text-black text-nowrap">My GYM</Typography>
          </section>
          <section className=" flex gap-3 justify-between">

            <SearchIcon
              fontSize="large"
              sx={{ color: "#881337", padding: "0.25rem 0 0 0.5rem" }}

              onClick={() => setSearchDrawer(true)}
            />


            <div>
              <Badge badgeContent={0} color="secondary" className="mt-1" showZero>
                <ShoppingCartOutlined
                  sx={{ fontSize: "1.8rem" }}
                  className="text-rose-900"
                  onClick={() => { }}
                />
              </Badge>
            </div>


            <Drawer
              anchor="top"
              open={searchDrawer}
              onClose={toggleDrawer(false)}
            >
              <div style={{ padding: "1rem 0.4rem 1rem 0.4rem" }}>
                <SearchBar />
              </div>
            </Drawer>

          </section>
        </Toolbar>

        <section className="flex gap-2 bg-gray-700 pl-4 content-center items-center hidden md:block">
         
          {tabBar?.map((item, i) => (
            <Button
              key={i}
              className="text-white text-md md:text-base"
              onClick={() => navigate(item?.url)}
            >
              {item?.name}
            </Button>
          ))}
        </section>

      </AppBar>

      <Drawer anchor="left" open={isMenu} onClose={() => setIsMenu(false)}>
        <section style={{ height: "3.5rem", backgroundColor: "rgb(55 65 81)" }}>
          <Typography style={{ color: "white", padding: "15px" }}>
            {" "}
            Hello User
          </Typography>
        </section>
        <List>
          
          {tabBar?.map((item, i) => (
            <ListItemButton
              onClick={() => [navigate(item?.url), setIsMenu(false)]}
              key={i}
            >
              {/* HERE */}
              <ListItemIcon>{item?.icon}</ListItemIcon>
              <ListItemText>{item?.name}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  )
}

export default Header
