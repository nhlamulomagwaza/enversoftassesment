import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { deleteSupplier, setPage, setPageSize, searchSuppliers, fetchSuppliers } from '../store/supplierSlice';
import { ROUTES } from '../constants/routes';
import { UI_CONSTANTS } from '../constants/ui';
import type { Supplier } from '../store/supplierSlice';
import type { RootState, AppDispatch } from '../store/store.ts';

const SupplierList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { suppliers, loading, currentPage, pageSize } = useSelector((state: RootState) => state.suppliers);

  const [query, setQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null);
  const isInitialMount = useRef(true);

  // Fetching suppliers list on component mount
  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  // Only when the searchbox is cleared we will refetch all suppliers list by default
  //Others we will seaerch by company NAME and update the list by search result after user click search
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (query.trim() === '') {
      dispatch(setPage(0));
      dispatch(fetchSuppliers());
    }
  }, [query, dispatch]);

  const handleSearch = useCallback(() => {
    dispatch(setPage(0));
    if (query.trim()) {
      dispatch(searchSuppliers(query));
    } else {
      dispatch(fetchSuppliers());
    }
  }, [query, dispatch]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const filteredSuppliers = useMemo(() => {
    return suppliers;
  }, [suppliers]);

  const paginatedSuppliers = useMemo(() => {
    const start = currentPage * pageSize;
    return filteredSuppliers.slice(start, start + pageSize);
  }, [filteredSuppliers, currentPage, pageSize]);

  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  }, [dispatch]);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPageSize(parseInt(event.target.value, 10)));
  }, [dispatch]);

  const handleEdit = useCallback((supplier: Supplier) => {
    navigate(ROUTES.ADD_SUPPLIER, { state: { supplier } });
  }, [navigate]);

  const handleDeleteClick = useCallback((supplier: Supplier) => {
    setSupplierToDelete(supplier);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (supplierToDelete) {
      try {
        await dispatch(deleteSupplier(supplierToDelete.id)).unwrap();
      } catch {
        // I'm Error handling by redux thunk
      }
    }
    setDeleteDialogOpen(false);
    setSupplierToDelete(null);
  }, [supplierToDelete, dispatch]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialogOpen(false);
    setSupplierToDelete(null);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Supplier List
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search by company name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Search
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Telephone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.companyName}</TableCell>
                <TableCell>{supplier.telephoneNumber}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(supplier)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(supplier)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredSuppliers.length}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={UI_CONSTANTS.PAGE_SIZE_OPTIONS}
      />
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Supplier</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{supplierToDelete?.companyName}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SupplierList;