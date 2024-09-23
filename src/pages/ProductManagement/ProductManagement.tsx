import React, { useContext, useEffect, useState } from 'react'
import { Product } from '../../utils/utils';
import { deleteProductRecord, getAllProduct } from '../../ApiGateways/product';
import { Context } from '../../state/Provider';
import { Button, Dialog, DialogActions, DialogTitle, TableCell, TableRow } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GenericTable from '../../components/GenericTable/GenericTable';
import ProductFormDialog from '../Products/ProductFormDialog';

export type ProductFormValues = {
    _id?: string;
    name: string;
    price: number;
    description: string;
    stock_quantity: number;
    category: string;
    images: string[];
    deletedImages?: string[];
    featured: boolean;
};


const ProductManagement = () => {

    const { filters } = useContext(Context);


    const [allProduct, setAllProduct] = useState<Product[]>([]);
    const [totalProduct, setTotalProduct] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);


    const [deleteProductData, setDeleteProductData] = useState({
        open: false,
        id: "",
        index: 0,
    });

    const [debounceTimeout, setDebounceTimeout] = useState<number>();

    const columns = {
        Name: { width: 50 },
        Price: { width: 100 },
        Description: { width: 200 },
        Stock: { width: 100 },
        Category: { width: 100 },
        Preview: { width: 150 },
        Action: { width: 120 },
    };

    const initialProductFormState = {
        name: '',
        price: 0,
        description: '',
        stock_quantity: 0,
        category: '',
        images: [],
        featured: false,
    }

    const [formValues, setFormValues] = useState<ProductFormValues>(initialProductFormState);

    useEffect(() => {

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeoutId = setTimeout(() => {
            getAllProduct(page + 1, rowsPerPage, false, filters,
                (data) => {
                    setTotalProduct(data?.data?.total_product)
                    setAllProduct(data?.data?.data)
                },
                res => console.log(res)
            )
        }, 1000);

        setDebounceTimeout(timeoutId);

        return () => {
            clearTimeout(timeoutId);
        };


    }, [filters?.search]);


    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number
    ) => {
        getAllProduct(newPage + 1, rowsPerPage, false, filters,
            (data) => {
                setTotalProduct(data?.data?.total_product)
                setAllProduct(data?.data?.data)
            },
            res => console.log(res)
        );
        setPage(newPage);

    };


    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        getAllProduct(1, +event.target.value, false, filters,
            (data) => {
                setTotalProduct(data?.data?.total_product)
                setAllProduct(data?.data?.data)
            },
            res => console.log(res)
        );
        setRowsPerPage(+event.target.value);
    };

    const DescriptionWithToggle = ({ text, limit }: { text: string, limit: number }) => {
        const [isExpanded, setIsExpanded] = useState(false);

        const toggleExpansion = () => {
            setIsExpanded(!isExpanded);
        };

        const truncatedText = text.length > limit ? text.slice(0, limit) + '...' : text;

        return (
            <div>
                <span>{isExpanded ? text : truncatedText}</span>
                {text.length > limit && (
                    <Button onClick={toggleExpansion} color="primary" sx={{ textTransform: 'none' }}>
                        {isExpanded ? 'See less' : 'See more'}
                    </Button>
                )}
            </div>
        );
    };


    const handleDeleteProduct = (id: string, index: number) => {
        deleteProductRecord(
            id,
            (data) => {
                if (data?.success === true) {
                    const temp = [...allProduct];
                    temp.splice(index, 1);
                    setAllProduct(temp);
                }
            },
            (res) => console.log(res)
        );
    };


    const createTableRows = (products: Product[]) =>
        products?.map((product: Product, index: number) => (
            <TableRow key={index}>
                <TableCell sx={{ textAlign: "center" }}>{product?.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{product?.price}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                    <DescriptionWithToggle text={product?.description} limit={100} />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{product?.stock_quantity}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{product?.category}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            window.open(`/product_details/${product._id}`, "_blank")
                        }}
                    >
                        View Product Details
                    </Button>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                    <Button color="info" onClick={() => {
                        setDeleteProductData({
                            open: false,
                            id: product?._id,
                            index: index,
                        });
                        setFormValues(product as any);
                        setOpen(true);
                    }}>
                        <EditIcon />
                    </Button>
                    <Button
                        color="error"
                        onClick={() => {
                            setDeleteProductData({
                                open: true,
                                id: product?._id,
                                index: index,
                            });
                        }}
                    >
                        <DeleteIcon />
                    </Button>
                </TableCell>
            </TableRow>
        ));

    return (
        <div className=''>
            <div className=' mt-12'>

                <div className='px-2 mb-4'>
                    <Button onClick={() => { setOpen(true) }} className='bg-green-500 hover:opacity-75 text-white'>Insert Product</Button>
                </div>

                <Dialog
                    fullWidth
                    open={deleteProductData?.open}
                    onClose={() => setDeleteProductData({ ...deleteProductData, open: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Do you want to delete this product ? `}
                    </DialogTitle>

                    <DialogActions>
                        <Button onClick={() => setDeleteProductData({ ...deleteProductData, open: false })} variant='outlined' color='error'>No</Button>
                        <Button onClick={() => {
                            handleDeleteProduct(deleteProductData?.id, deleteProductData?.index);
                            setDeleteProductData({
                                open: false,
                                id: "",
                                index: 0,
                            })

                        }} variant='outlined' color='success'>Yes</Button>
                    </DialogActions>
                </Dialog>

                <ProductFormDialog
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setFormValues(initialProductFormState);
                    }}
                    updateProduct={(data) => {
                        const temp = [...allProduct];
                        temp.splice(deleteProductData?.index, 1);
                        setAllProduct([data, ...temp])
                    }}
                    createProduct={(data) => {
                        setAllProduct([data, ...allProduct]);
                    }}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    initialFormState={initialProductFormState}
                />

                <GenericTable
                    columns={columns}
                    data={createTableRows(allProduct)}
                    total={totalProduct}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </div>
    )
}

export default ProductManagement
