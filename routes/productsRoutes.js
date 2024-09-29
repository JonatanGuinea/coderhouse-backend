import { Router } from 'express';
import fs from 'fs';

const router = Router();
const path = './data/productos.json';

// Helper para leer productos desde el archivo
const readProducts = () => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

// Helper para escribir productos al archivo
const writeProducts = (products) => {
  fs.writeFileSync(path, JSON.stringify(products, null, 2), 'utf-8');
};

// Ruta GET / - Listar todos los productos (con opción de limitación)
router.get('/', (req, res) => {
  let products = readProducts();
  const limit = parseInt(req.query.limit) || products.length;
  res.json(products.slice(0, limit));
});

// Ruta GET /:pid - Obtener un producto por ID
router.get('/:pid', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.pid);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});

// Ruta POST / - Agregar un nuevo producto
router.post('/', (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: (products.length + 1).toString(),
    ...req.body,
    status: req.body.status ?? true, // Status por defecto true
  };
  
  // Validar que todos los campos obligatorios estén presentes
  const { title, description, code, price, stock, category } = newProduct;
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

// Ruta PUT /:pid - Actualizar un producto por ID
router.put('/:pid', (req, res) => {
  const products = readProducts();
  const productIndex = products.findIndex(p => p.id === req.params.pid);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Evitar que se actualice el ID
  const { id, ...updates } = req.body;
  products[productIndex] = { ...products[productIndex], ...updates };
  
  writeProducts(products);
  res.json(products[productIndex]);
});

// Ruta DELETE /:pid - Eliminar un producto por ID
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
