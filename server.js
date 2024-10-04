import express from 'express';
import productsRoutes from './routes/productsRoutes.js';
import cartsRoutes from './routes/cartsRoutes.js';
import config from './routes/config.js'

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended:true}))


app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

app.get('/', (req,res)=>{res.status(200).send('hola')});

app.use('/static', express.static(`${config.DIRNAME}/public`));

// Servidor escuchando en el puerto 8080

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});


console.log('DIRNAME:', config.DIRNAME);

