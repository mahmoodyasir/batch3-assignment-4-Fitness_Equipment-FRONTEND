import { Autocomplete, IconButton, InputAdornment, TextField } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import { url } from "../../../config";


const SearchBar = () => {
  return (
    <div className=" md:w-4/5 w-full">
      <Autocomplete
        value={null}
        options={[]}
        fullWidth
        freeSolo
        onChange={(event, newValue: any) => {
          // setRetrieved(newValue?.name);
          // newValue?.id && navigate(`/product_details/${newValue?.id}`);
          // newValue?.id === '' && searchByCategory(newValue?.name);

        }}
        autoHighlight
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option
          else return option.name + " " + option.categories.join(" ")

        }}

        renderOption={(props, option) => (
          <li {...props}>
            <span style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              {
                option?.id ?
                  <>
                    <img style={{ width: "1.5rem", height: "1.5rem" }} src={option?.images.length > 0 ? `${url}/product/file/${option.images[0]}` : ""} alt="" />
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
            onChange={(e) => {  }}
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
