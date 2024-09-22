import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    TableBody,
    TableFooter,
    TablePagination,
} from "@mui/material";
import React from "react";

type Props = {
    columns: Record<string, { width: number }>;
    data: JSX.Element[];
    total: number;
    rowsPerPage: number;
    page: number;
    onChangePage: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        page: number
    ) => void;
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function GenericTable(props: Props) {
    const { columns, data, total, rowsPerPage, page, onChangePage, onChangeRowsPerPage } = props;

    return (
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-1 rounded-lg mx-2">
            <TableContainer className="bg-white rounded-lg">
                <Table className="w-full">
                    {/* Table Head with Gradient */}
                    <TableHead>
                        <TableRow className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
                            {Object.entries(columns).map(([column, col_vals], index) => (
                                <TableCell key={index} sx={{ width: col_vals.width }}>
                                    <Typography className="font-semibold text-center">
                                        {column}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {/* Table Body */}
                    <TableBody>{data}</TableBody>
                    {/* Table Footer for Pagination */}
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[2, 3, 5, 10]}
                                count={total}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={onChangePage}
                                onRowsPerPageChange={onChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}

export default GenericTable;
