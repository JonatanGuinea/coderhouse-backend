import express from 'express';
import productsRoutes from './routes/productsRoutes.js';
import cartsRoutes from './routes/cartsRoutes.js';

const app = express();

app.use(express.json()); // Para procesar JSON

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Servidor escuchando en el puerto 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
