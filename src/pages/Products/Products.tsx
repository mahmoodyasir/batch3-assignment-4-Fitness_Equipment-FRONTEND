import { Button, Checkbox, Drawer, FormControlLabel, FormGroup, Pagination, Slider, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { filterTypes, ITEM_PER_PAGE, MAX_PRICE_LIMIT, noNegative } from '../../utils/utils';
import Radio from '@mui/material/Radio';
import { getAllProduct } from '../../ApiGateways/product';
import { useAppDispatch, useAppSelector } from '../../Redux/app/hooks';
import { setProducts } from '../../Redux/features/productSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Context } from '../../state/Provider';


const FilterTab = () => {

  const { filters, setFilters } = useContext(Context);
  

  const categories = ["cable machines", "dumbbells", "elliptical", "treadmill", "barbell", "bench"];


  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {

      setFilters({ ...filters, minPrice: newValue[0], maxPrice: newValue[1] })
    }
  };


  const handleMinPriceInputChange = (value: number) => {

    if (value > MAX_PRICE_LIMIT) {
      value = MAX_PRICE_LIMIT;
    }

    setFilters({ ...filters, minPrice: value })

  };

  const handleMaxPriceInputChange = (value: number) => {

    if (value > MAX_PRICE_LIMIT) {
      value = MAX_PRICE_LIMIT;
    }

    else if (value <= 0) {
      value = 1;
    }

    setFilters({ ...filters, maxPrice: value })

  };


  const handleCheckbox = (value: string) => {
    if (filters.categories.includes(value)) {

      setFilters({ ...filters, categories: filters.categories.filter(category => category !== value) })
    } else {

      setFilters({ ...filters, categories: [...filters.categories, value] });
    }
  };



  return (
    <div className={`rounded-2xl shadow-xl`} style={{ minWidth: "250px", backgroundColor: "#FFFFFF", padding: "0.5rem", border: "1px solid #9E9E9E" }}>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

        <Button onClick={() => {

          setFilters({
            search: "",
            categories: [],
            minPrice: 0,
            maxPrice: MAX_PRICE_LIMIT,
            sortOrder: ""

          })

        }} variant="outlined" size="small"
          sx={{
            marginTop: '1rem',
            textTransform: "none",
            color: "black",
            border: "1px solid black"
          }}>
          Clear Filters
        </Button>
      </div>

      <article style={{ padding: "0.5rem 0 0.5rem 1rem", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h5">
          Sort By
        </Typography>

        <div>
          <FormControlLabel
            value="asc"
            control={
              <Radio
                checked={filters?.sortOrder === "asc"}
                value="asc"
                onChange={(e) => {
                  setFilters({ ...filters, sortOrder: e.target.value })
                }}
              />
            }
            label="Ascending" />

          <FormControlLabel
            value="asc"
            control={
              <Radio
                checked={filters?.sortOrder === "desc"}
                value="desc"
                onChange={(e) => {
                  setFilters({ ...filters, sortOrder: e.target.value })
                }}
              />
            }
            label="Descending" />
        </div>
      </article>

      <article style={{ padding: "0.5rem 0 0.5rem 1rem", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h5">
          Price Range
        </Typography>
        <Slider
          value={[filters?.minPrice ? filters?.minPrice : 0, filters?.maxPrice ? filters?.maxPrice : MAX_PRICE_LIMIT]}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={MAX_PRICE_LIMIT}
          step={100}
          style={{ maxWidth: "90%", marginLeft: "0.5rem", color: "black" }}
        />

        <section style={{ display: "flex", justifyContent: "space-between", gap: "3rem" }}>
          <TextField
            type="number"
            value={filters?.minPrice}
            onChange={(e) => handleMinPriceInputChange(noNegative(Number(e.target.value)))}
            label="Min Price"
            variant="outlined"
            size="small"
            style={{ marginTop: '1rem' }}
          />
          <TextField
            type="number"
            value={filters?.maxPrice}
            onChange={(e) => handleMaxPriceInputChange(noNegative(Number(e.target.value)))}
            label="Max Price"
            variant="outlined"
            size="small"
            style={{ marginTop: '1rem' }}
          />

        </section>
      </article>

      <article>
        <FormGroup style={{ display: "flex", overflowY: 'auto' }}>
          {
            categories?.map((value, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={filters.categories.includes(value)}
                    onChange={() => handleCheckbox(value)}
                  />
                }
                label={
                  <Typography variant="subtitle1" sx={{ textTransform: "none" }}>
                    {value.split(" ").map((k) => k ? k[0].toUpperCase() + k.slice(1) : "").join(" ")}
                  </Typography>
                }
                sx={{ marginLeft: "0.5rem" }}
              />
            ))
          }
        </FormGroup>
      </article>



    </div>
  )
}

const Products = () => {

  const dispatch = useAppDispatch();

  const all_products = useAppSelector((state) => state.productState);
  const [debounceTimeout, setDebounceTimeout] = useState<number>();

  const { filters, setFilters } = useContext(Context);

  const [openFilter, setOpenFilter] = useState(false);
  const [reset, setReset] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);


  useEffect(() => {

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      getAllProduct(page, ITEM_PER_PAGE, false, filters,
        (data) => {
          dispatch(setProducts(data?.data));
          setPage(data?.data?.page);
          setTotalPage(data?.data?.total_pages)
        },
        res => console.log(res)
      )
    }, 1000);

    setDebounceTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };

    
  }, [page, filters]);


  return (
    <div className='px-4'>

      <div className='mt-8 block lg:hidden'>
        <Button onClick={() => setOpenFilter(true)} className=' bg-black opacity-80 hover:bg-green-400 text-white rounded-lg px-5'>Filter Option</Button>
      </div>
      <div className="grid grid-cols-4 gap-x-8 my-8" >
        <Drawer
          anchor="bottom"
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          className="block lg:hidden col-span-1 row-span-4"
          PaperProps={{
            style: {
              maxHeight: "50%",
              borderRadius: "1rem 1rem 0 0"
            }
          }}
        >
          <FilterTab/>
        </Drawer>

        <article className="hidden lg:block col-span-1 row-span-4" >
          <FilterTab />
        </article>

        <article className="col-span-4 lg:col-span-3 flex flex-col gap-12 items-center">
          <section className="flex gap-6 flex-wrap justify-center" >
            {all_products?.data?.map((item: any, id: number) => (
              <ProductCard
                key={id}
                item={item}
              />
            ))}
          </section>

          <Pagination count={totalPage} page={page} onChange={(event: any, value: number) => { setPage(value) }}
            sx={{
              "li > button": {
                backgroundColor: "#73555f",
                color: "white"
              },
              "li > button.Mui-selected": {
                backgroundColor: "#3da15a",
                color: "white"
              }
            }} />
        </article>
      </div>
    </div>
  )
}

export default Products
