import React, { useState } from 'react';
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
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import { ProductFormValues } from '../ProductManagement/ProductManagement';
import { Product } from '../../utils/utils';
import FileUploader from '../../components/FileUploader/FileUploader';
import { insertProduct, updateProductData } from '../../ApiGateways/product';


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
    const { open, formValues, setFormValues, onClose, updateProduct, createProduct } = props;

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
        formData.append('featured', formValues?.featured ? formValues.featured.toString() : 'false');

        if (formValues?._id && formValues?.deletedImages && formValues?.deletedImages?.length > 0) {
            formData.append('deletedImages', JSON.stringify(formValues?.deletedImages))
        }

        submitImages.map((image, _idx) => formData.append(`images`, image));

        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        if (formValues?._id) {
            updateProductData(formValues?._id, formData,
                (data) => {
                    updateProduct(data?.data);
                    handleClose();
                },
                (res) => console.log(res)
            )
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
                <DialogTitle>{formValues?._id ? 'Update The Product' : 'Add New Product'}</DialogTitle>
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

                    <FormGroup>
                        <FormControlLabel required control={
                            <Checkbox
                                checked={formValues?.featured}
                                onChange={() => setFormValues({ ...formValues, featured: !formValues?.featured })}
                            />
                        } label="Featured" />
                    </FormGroup>

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

                            const deletedImages = formValues.deletedImages || [];
                            if (!deletedImages.includes(name)) {
                                deletedImages.push(name);
                            }

                            setFormValues({
                                ...formValues,
                                images: formValues.images.filter((image) => image !== name),
                                deletedImages,
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
                        {formValues?._id ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductFormDialog;
