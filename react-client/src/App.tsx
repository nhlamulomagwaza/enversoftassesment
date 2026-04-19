import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fetchSuppliers } from './store/supplierSlice';
import { ROUTES } from './constants/routes';
import type { AppDispatch } from './store/store.ts';
import SupplierForm from './components/SupplierForm';
import SupplierList from './components/SupplierList';

const theme = createTheme();

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>  {/* THEME Provider from material ui */}
      <Router>
        <Container maxWidth="md">
          <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Enversoft Mini Project
              </Typography>
            </Toolbar>
          </AppBar>

          <Box sx={{ mb: 2 }}>
            <Button component={Link} to={ROUTES.ADD_SUPPLIER} variant="contained" sx={{ mr: 2 }}>
              Add Supplier
            </Button>
            <Button component={Link} to={ROUTES.SUPPLIER_LIST} variant="contained">
              Supplier List
            </Button>
          </Box>

          <Routes>
            <Route path={ROUTES.ADD_SUPPLIER} element={<SupplierForm />} />
            <Route path={ROUTES.SUPPLIER_LIST} element={<SupplierList />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
