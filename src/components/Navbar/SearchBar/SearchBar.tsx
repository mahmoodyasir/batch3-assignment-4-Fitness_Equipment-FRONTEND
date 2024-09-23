import { Autocomplete, IconButton, InputAdornment, TextField } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useState } from "react";
import { ITEM_PER_PAGE, MAX_PRICE_LIMIT, Product } from "../../../utils/utils";
import { Context } from "../../../state/Provider";
import { getAllProduct } from "../../../ApiGateways/product";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {

  const { filters, setFilters } = useContext(Context);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [retrieved, setRetrieved] = useState<Product | null>(null);
  let debounceTimeout: number;


  const searchWithDelay = (key: string | undefined) => {
    clearTimeout(debounceTimeout);

    let tempFilter = {
      search: key as string,
      categories: [],
      minPrice: 0,
      maxPrice: MAX_PRICE_LIMIT,
      sortOrder: ""
    }

    debounceTimeout = setTimeout(() => {
      getAllProduct(1, ITEM_PER_PAGE, true, tempFilter,
        (data) => {
          if (key) {
            setSearchResults([
              {
                _id: '',
                name: String(key),
                price: 0,
                description: '',
                images: [],
                stock_quantity: 0,
                category: '',
                createdAt: '',
                updatedAt: '',

              },
              ...data?.data?.data
            ]);

            setFilters({ ...filters, search: key });
          }
          else {
            setSearchResults(data?.data?.data);
            setFilters({...filters, search: ""});
          }
        },
        res => console.log(res)
      )
    }, 500);
  };


  return (
    <div className=" md:w-4/5 w-full">
      <Autocomplete
        value={retrieved}
        options={searchResults}
        fullWidth
        freeSolo
        onChange={(_event, newValue: any) => {
          setRetrieved(newValue?.name);
          newValue?._id && navigate(`/product_details/${newValue?._id}`);
          // newValue?.id === '' && searchByCategory(newValue?.name);

        }}
        autoHighlight
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option
          else return option.name

        }}

        renderOption={(props, option) => (
          
          <li {...props}>
            <span style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              {
                option?._id ?
                  <>
                    <img style={{ width: "1.5rem", height: "1.5rem" }} src={option?.images.length > 0 ? `${option.images[0]}` : ""} alt="" />
                  </>
                  :
                  <>
                    <SearchIcon />
                  </>
              }
              {option?.name}
            </span>
          </li>
        )}
        sx={{
          "& .MuiAutocomplete-inputRoot": {
            padding: 0,
            paddingLeft: "0.5rem"
          },
          "& .MuiAutocomplete-input": {
            padding: 0,
            paddingLeft: "0.5rem"
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            onChange={(e) => { searchWithDelay(e.target.value); }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton aria-label='filter'>
                    <TuneIcon className="w-6 h-6" />
                  </IconButton>
                  <IconButton aria-label='search'>
                    <SearchIcon className="w-6 h-6" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
      />
    </div>
  )
}

export default SearchBar
