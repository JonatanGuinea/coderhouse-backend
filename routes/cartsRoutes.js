import { Router } from 'express';
import fs from 'fs';

const router = Router();
const path = './data/carrito.json';

// para leer carritos desde el archivo
const readCarts = () => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

// Hpara escribir carritos al archivo
const writeCarts = (carts) => {
  fs.writeFileSync(path, JSON.stringify(carts, null, 2), 'utf-8');
};

// Ruta POST / - para crear un nuevo carrito
router.post('/', (req, res) => {
  const carts = readCarts();
  const newCart = {
    id: (carts.length + 1).toString(),
    products: []
  };
  
  carts.push(newCart);
  writeCarts(carts);
  res.status(201).json(newCart);
});

// Ruta GET /:cid - para obtener productos de un carrito por ID
router.get('/:cid', (req, res) => {
  const carts = readCarts();
  const cart = carts.find(c => c.id === req.params.cid);
  
  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  res.json(cart.products);
});

// Ruta POST /:cid/product/:pid - para agregar producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
  const carts = readCarts();
  const cartIndex = carts.findIndex(c => c.id === req.params.cid);
  
  if (cartIndex === -1) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  const productId = req.params.pid;
  const productInCart = carts[cartIndex].products.find(p => p.product === productId);
  
  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    carts[cartIndex].products.push({ product: productId, quantity: 1 });
  }

  writeCarts(carts);
  res.json(carts[cartIndex]);
});

export default router;
