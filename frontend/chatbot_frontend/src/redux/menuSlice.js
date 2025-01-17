import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción asincrónica para obtener el menú
export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  const response = await axios.get('http://localhost:5000/products');
  return response.data; // Suponiendo que el API devuelve un arreglo
});

// Slice del menú
const menuSlice = createSlice({
  name: 'menu',
  initialState: [], // Estado inicial como arreglo vacío
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      return action.payload; // Reemplaza el estado con los datos obtenidos
    });
  },
});

export default menuSlice.reducer;
