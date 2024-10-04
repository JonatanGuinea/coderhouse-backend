import { Router } from 'express';
import fs from 'fs';
import { uploader } from '../uploader.js';

const router = Router();
const path = './data/productos.json';


const readProducts = () => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

//escribir productos al archivo
const writeProducts = (products) => {
  fs.writeFileSync(path, JSON.stringify(products, null, 2), 'utf-8');
};

// Ruta GET / Listar todos los productos 
router.get('/', (req, res) => {
  let products = readProducts();
  const limit = parseInt(req.query.limit) || products.length;
  res.json(products.slice(0, limit));
});

// Ruta GET /:pid  para obtener un producto por ID
router.get('/:pid', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.pid);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});

// Ruta POST / para agregar un nuevo producto
router.post('/',uploader.single('thumbnail'), (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: (products.length + 1).toString(),
    ...req.body,
    status: req.body.status ?? true
  };
  
  // Validar que todos los campos obligatorios esten presentes
  const { title, description, code, price, stock, category } = newProduct;
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  products.push(newProduct);
  writeProducts(products);
  res.status(201).send(newProduct);

  
});

// Ruta PUT /:pid paara actualizar un producto por ID
router.put('/:pid', (req, res) => {
  const products = readProducts();
  const productIndex = products.findIndex(p => p.id === req.params.pid);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }


  const { id, ...updates } = req.body;
  products[productIndex] = { ...products[productIndex], ...updates };
  
  writeProducts(products);
  res.json(products[productIndex]);
});

// Ruta DELETE /:pid para eliminar un producto por ID
router.delete('/:pid', (req, res) => {
  let products = readProducts();
  const newProducts = products.filter(p => p.id !== req.params.pid);
  
  if (products.length === newProducts.length) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  
  writeProducts(newProducts);
  res.status(204).send();
});

export default router;
