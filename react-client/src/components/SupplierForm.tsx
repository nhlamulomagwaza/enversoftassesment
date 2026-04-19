import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material';
import { addSupplier, updateSupplier } from '../store/supplierSlice';
import { ROUTES } from '../constants/routes';
import type { RootState, AppDispatch } from '../store/store.ts';
import type { Supplier } from '../store/supplierSlice';

const SupplierForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state: RootState) => state.suppliers);

  const editingSupplier = location.state?.supplier as Supplier | undefined;
  const isEditing = !!editingSupplier;

  const [formData, setFormData] = useState({
    companyName: editingSupplier?.companyName || '',
    telephoneNumber: editingSupplier?.telephoneNumber || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.telephoneNumber) return;

    try {
      if (isEditing && editingSupplier) {
        await dispatch(updateSupplier({ ...editingSupplier, ...formData })).unwrap();
      } else {
        await dispatch(addSupplier(formData)).unwrap();
      }
      navigate(ROUTES.SUPPLIER_LIST);
    } catch {
      //I won't catch errors here as they are handled by redux thunk
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {isEditing ? 'Edit Supplier' : 'Add New Supplier'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Company Name"
          value={formData.companyName}
          onChange={handleChange('companyName')}
          required
          fullWidth
        />
        <TextField
          label="Telephone Number"
          value={formData.telephoneNumber}
          onChange={handleChange('telephoneNumber')}
          required
          fullWidth
        />
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null} //Loading spinner
          >
            {isEditing ? 'Update Supplier' : 'Save Supplier'}
          </Button>
          <Button variant="outlined" onClick={() => navigate(ROUTES.SUPPLIER_LIST)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SupplierForm;