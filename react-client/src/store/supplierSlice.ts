// Redux slice for managing supplier state, including async thunks for CRUD operations and search functionality.
// It also handles error management and pagination state.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config/api';
import { UI_CONSTANTS } from '../constants/ui';

export interface Supplier {
  id: number;
  companyName: string;
  telephoneNumber: string;
}

const handleThunkError = (error: unknown, errorMessage: string) => {
  toast.error(errorMessage);
  return error instanceof Error ? error.message : errorMessage;
};

export const fetchSuppliers = createAsyncThunk(
  'suppliers/fetchSuppliers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleThunkError(error, 'Failed to fetch suppliers'));
    }
  }
);

export const addSupplier = createAsyncThunk(
  'suppliers/addSupplier',
  async (supplier: Omit<Supplier, 'id'>, { rejectWithValue, dispatch }) => {
    try {
      await axios.post(API_BASE_URL, supplier);
      toast.success('Supplier added successfully');
      await dispatch(fetchSuppliers());
      return null;
    } catch (error: unknown) {
      return rejectWithValue(handleThunkError(error, 'Failed to add supplier'));
    }
  }
);

export const updateSupplier = createAsyncThunk(
  'suppliers/updateSupplier',
  async (supplier: Supplier, { rejectWithValue, dispatch }) => {
    try {
      await axios.put(`${API_BASE_URL}/${supplier.id}`, supplier);
      toast.success('Supplier updated successfully');
      await dispatch(fetchSuppliers());
      return null;
    } catch (error: unknown) {
      return rejectWithValue(handleThunkError(error, 'Failed to update supplier'));
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  'suppliers/deleteSupplier',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      toast.success('Supplier deleted successfully');
      return id;
    } catch (error: unknown) {
      return rejectWithValue(handleThunkError(error, 'Failed to delete supplier'));
    }
  }
);

export const searchSuppliers = createAsyncThunk(
  'suppliers/searchSuppliers',
  async (companyName: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search?companyName=${companyName}`);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleThunkError(error, 'Failed to search suppliers'));
    }
  }
);

interface SupplierState {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
}

const initialState: SupplierState = {
  suppliers: [],
  loading: false,
  error: null,
  currentPage: 0,
  pageSize: UI_CONSTANTS.DEFAULT_PAGE_SIZE,
};

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.currentPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addSupplier.fulfilled, (state) => {
        // Suppliers will be refetched and updated by fetchSuppliers
      })
      .addCase(updateSupplier.fulfilled, (state) => {
        // Suppliers will be refetched and updated by fetchSuppliers
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.suppliers = state.suppliers.filter(s => s.id !== action.payload);
      })
      .addCase(searchSuppliers.fulfilled, (state, action) => {
        state.suppliers = action.payload;
        state.currentPage = 0;
      });
  },
});

export const { setPage, setPageSize } = supplierSlice.actions;
export default supplierSlice.reducer;