import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    InputLabel,
    MenuItem,
    Select,
    FormControl
} from '@mui/material';
import { ProductFormValues } from '../ProductManagement/ProductManagement';
import { Product } from '../../utils/utils';
import UploadIcon from '@mui/icons-material/Upload';
import FileUploader from '../../components/FileUploader/FileUploader';
import { insertProduct } from '../../ApiGateways/product';


type ProductFormTDialogType = {
    onClose: () => void;
    updateProduct: (product: Product) => void;
    createProduct: (product: Product) => void;
    open: boolean;
    formValues: ProductFormValues;
    setFormValues: React.Dispatch<React.SetStateAction<ProductFormValues>>;
    initialFormState: ProductFormValues;
}

const categories = ["cable machines", "dumbbells", "elliptical", "treadmill", "barbell", "bench"];

const ProductFormDialog = (props: ProductFormTDialogType) => {
    const { open, formValues, setFormValues, onClose, updateProduct, createProduct, initialFormState } = props;

    const [fileNames, setFileNames] = useState<string[]>([]);

    const [images, setImages] = useState<any[]>([]);

    const handleClose = () => {
        onClose();
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setFormValues({ ...formValues, category: e.target.value as string });
    };

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         const files = Array.from(e.target.files);
    //         setFormValues({ ...formValues, images: files });
    //         setFileNames(files.map(file => file.name)); // Display file names
    //     }
    // };


    const handleSubmit = (event: any) => {

        event.preventDefault();
        const submitImages = [...images];

        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('price', formValues.price.toString());
        formData.append('description', formValues.description);
        formData.append('stock_quantity', formValues.stock_quantity.toString());
        formData.append('category', formValues.category);

        submitImages.map((image, idx) => formData.append(`images`, image));

        // formData.forEach((value, key) => {
        //     console.log(`${key}:`, value);
        // });

        if (formValues?._id) {

        }
        else {
            insertProduct(formData,
                (data) => {
                    createProduct(data?.data);
                    handleClose();
                },
                (res) => console.log(res)
            )
        }
    };

    return (
        <>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    {/* Product Name */}
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        label="Product Name"
                        name="name"
                        fullWidth
                        value={formValues.name}
                        onChange={handleInputChange}
                    />

                    {/* Product Price */}
                    <TextField
                        required
                        margin="dense"
                        label="Price"
                        name="price"
                        type="number"
                        fullWidth
                        value={formValues.price}
                        onChange={handleInputChange}
                    />

                    {/* Product Description */}
                    <TextField
                        required
                        margin="dense"
                        label="Description"
                        name="description"
                        multiline
                        rows={3}
                        fullWidth
                        value={formValues.description}
                        onChange={handleInputChange}
                    />

                    {/* Stock Quantity */}
                    <TextField
                        required
                        margin="dense"
                        label="Stock Quantity"
                        name="stock_quantity"
                        type="number"
                        fullWidth
                        value={formValues.stock_quantity}
                        onChange={handleInputChange}
                    />

                    {/* Category Selection */}
                    <FormControl fullWidth margin="dense" >
                        <InputLabel>Category</InputLabel>
                        <Select
                            required
                            label="Category"
                            value={formValues.category}
                            onChange={(e: any) => { handleCategoryChange(e) }}
                        >
                            {categories.map((cat, index) => (
                                <MenuItem key={index} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Image Upload */}
                    <FileUploader
                        style={{
                            display: "flex",
                            gap: "0 1rem",
                            alignItems: "center",
                            margin: "0.5rem 0",
                        }}
                        fileType="images"
                        names={formValues.images}
                        removeName={(name) => {
                            console.log(name)
                            setFormValues({
                                ...formValues,
                                images: formValues.images.filter((image) => image !== name),
                            });
                        }}
                        onFileSelect={(files) => setImages(files)}
                    />
                </DialogContent>

                {/* Dialog Actions */}
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button variant='outlined' onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductFormDialog;
