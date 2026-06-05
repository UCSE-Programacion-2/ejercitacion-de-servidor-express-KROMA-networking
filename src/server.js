const express = require('express');

const app = express();

const productos = [
  { id: 1, nombre: 'Laptop', categoria: 'electronica' },
  { id: 2, nombre: 'Silla', categoria: 'muebles' },
  { id: 3, nombre: 'Monitor', categoria: 'electronica' },
];

const usuarios = [
  { id: 1, nombre: 'Juan' },
  { id: 2, nombre: 'Maria' },
  { id: 3, nombre: 'Pedro' },
];

// 1. Ruta Raíz
app.get('/', (req, res) => {
  res.status(200).send('Bienvenid@s a nuestro servidor Express!');
});

// 2 y 3. Ruta Productos y Filtro por Categoría (Query String)
app.get('/productos', (req, res) => {
  const { categoria } = req.query;

  if (categoria) {
    const filtrados = productos.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase(),
    );
    return res.status(200).json(filtrados);
  }

  return res.status(200).json(productos);
});

// 3. Ruta de Usuarios
// 4. Ruta Usuarios por ID (Params)
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const usuarioEncontrado = usuarios.find((u) => u.id === parseInt(id, 10));

  if (!usuarioEncontrado) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  return res.status(200).json(usuarioEncontrado);
});

// 5. Manejo global de rutas no encontradas
app.use((req, res) => {
  res.status(404).send('No se ha encontrado la ruta ingresada.');
});

module.exports = app;
