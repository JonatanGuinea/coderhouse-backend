

# E-commerce API con Node.js y Express

Este proyecto es una API RESTful creada con **Node.js** y **Express** para gestionar productos y carritos de compra en una plataforma de e-commerce. Los datos de productos y carritos se almacenan en archivos JSON mediante el sistema de archivos.

## Características

- **Gestión de productos**: Crear, actualizar, listar y eliminar productos.
- **Gestión de carritos**: Crear carritos, listar productos en un carrito, y agregar productos a carritos existentes.
- **Persistencia de datos**: Los datos de productos y carritos se guardan en archivos JSON (`productos.json` y `carrito.json`).

## Requisitos previos

Asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [NPM](https://www.npmjs.com/) (se instala automáticamente con Node.js)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tuusuario/ecommerce-server.git
   ```

2. Navega a la carpeta del proyecto:

   ```bash
   cd ecommerce-server
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

## Uso

1. Inicia el servidor:

   ```bash
   npm start
   ```

   O si estás utilizando **Nodemon** para un reinicio automático:

   ```bash
   npx nodemon server.js
   ```

2. El servidor se ejecutará en el puerto `8080` por defecto. Puedes acceder a las rutas a través de `http://localhost:8080`.

## Endpoints

### Productos (Rutas de `/api/products`)

1. **Obtener todos los productos**  
   **GET** `/api/products`  
   Parámetro opcional: `?limit=<número>`  
   Retorna una lista de todos los productos (opcionalmente limitada).

   Ejemplo de uso:
   ```bash
   GET http://localhost:8080/api/products?limit=5
   ```

2. **Obtener un producto por ID**  
   **GET** `/api/products/:pid`  
   Retorna el producto con el ID especificado.

   Ejemplo de uso:
   ```bash
   GET http://localhost:8080/api/products/1
   ```

3. **Crear un nuevo producto**  
   **POST** `/api/products`  
   Agrega un nuevo producto. Los campos obligatorios son:
   - `title` (String)
   - `description` (String)
   - `code` (String)
   - `price` (Number)
   - `stock` (Number)
   - `category` (String)
   - `thumbnails` (Array de Strings, opcional)
   - `status` (Boolean, por defecto `true`)

   Ejemplo de uso:
   ```bash
   POST http://localhost:8080/api/products
   Content-Type: application/json
   {
     "title": "Producto A",
     "description": "Descripción del producto A",
     "code": "A123",
     "price": 100,
     "stock": 50,
     "category": "Categoría A",
     "thumbnails": ["https://example.com/image1.jpg"]
   }
   ```

4. **Actualizar un producto por ID**  
   **PUT** `/api/products/:pid`  
   Actualiza un producto por su ID, excepto el campo `id`.

   Ejemplo de uso:
   ```bash
   PUT http://localhost:8080/api/products/1
   Content-Type: application/json
   {
     "price": 120,
     "stock": 30
   }
   ```

5. **Eliminar un producto por ID**  
   **DELETE** `/api/products/:pid`  
   Elimina el producto con el ID especificado.

   Ejemplo de uso:
   ```bash
   DELETE http://localhost:8080/api/products/1
   ```

### Carritos (Rutas de `/api/carts`)

1. **Crear un nuevo carrito**  
   **POST** `/api/carts`  
   Crea un nuevo carrito vacío.

   Ejemplo de uso:
   ```bash
   POST http://localhost:8080/api/carts
   ```

2. **Obtener productos de un carrito por ID**  
   **GET** `/api/carts/:cid`  
   Lista todos los productos en el carrito con el ID especificado.

   Ejemplo de uso:
   ```bash
   GET http://localhost:8080/api/carts/1
   ```

3. **Agregar un producto a un carrito**  
   **POST** `/api/carts/:cid/product/:pid`  
   Agrega un producto al carrito especificado. Si el producto ya existe en el carrito, incrementa su cantidad.

   Ejemplo de uso:
   ```bash
   POST http://localhost:8080/api/carts/1/product/1
   ```

## Estructura del proyecto

```
ecommerce-server/
│
├── routes/
│   ├── productsRouter.js   # Rutas para los productos
│   └── cartsRouter.js      # Rutas para los carritos  
├── data/
│   ├── productos.json      # Archivo que almacena los productos
│   └── carrito.json        # Archivo que almacena los carritos
├── server.js               # Configuración del servidor y middleware
├── package.json            # Dependencias y scripts de NPM
└── README.md               # Este archivo
```

## Tecnologías utilizadas

- **Node.js**
- **Express**
- **File System** para la persistencia de datos
- **Nodemon** para el reinicio automático del servidor en desarrollo

## Notas adicionales

- Asegúrate de que los archivos `productos.json` y `carrito.json` existen en el directorio `data/`. Si no existen, crea archivos vacíos antes de ejecutar el servidor.
- Puedes usar **Postman** o cualquier cliente de API para interactuar con los endpoints.
- 
