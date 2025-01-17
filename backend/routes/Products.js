const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// para el caso de que la conexion con la BDD de mongo falle:
const sushiProducts = [
    {
      name: "Nigiri de Salmón",
      description: "Finas láminas de salmón fresco sobre arroz avinagrado.",
      price: 8.50,
    },
    {
      name: "Maki de Atún",
      description: "Rollos de alga nori rellenos de atún rojo y arroz.",
      price: 7.00,
    },
    {
      name: "Uramaki California Roll",
      description: "Rollo invertido con aguacate, pepino, cangrejo y sésamo.",
      price: 9.00,
    },
    {
      name: "Temaki de Langostino",
      description: "Cono de alga nori relleno de langostino, aguacate y mayonesa japonesa.",
      price: 10.50,
    },
    {
      name: "Sashimi de Lubina",
      description: "Finas láminas de lubina fresca, servidas con salsa de soja y wasabi.",
      price: 12.00,
    },
    {
      name: "Gunkan de Ikura",
      description: "Barco de alga nori relleno de huevas de salmón (ikura).",
      price: 11.00,
    },
      {
      name: "Roll Philadelphia",
      description: "Roll con salmon, queso crema y palta.",
      price: 15.00,
    },
      {
      name: "Roll Buenos Aires",
      description: "Roll con langostino, palta y mayonesa.",
      price: 14.00,
    },
      {
      name: "Geishas",
      description: "Roll de salmon rosado y arroz envuelto en palta.",
      price: 17.00,
    },
  ];

// Agregar múltiples productos (POST)
router.post('/', async (req, res) => {
    try {
        const productsToAdd = req.body; // Recibir el array de productos
        
        if (!Array.isArray(productsToAdd)) {
            return res.status(400).json({ error: 'Se espera un array de productos' });
        }

        const insertedProducts = await Product.insertMany(productsToAdd); // Insertar múltiples documentos
        res.status(201).json(insertedProducts); // Código 201 Created
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar los productos' });
    }
});


// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
        res.json(sushiProducts) //cubre el caso de error de la conexion con base de datos.
    }
});

module.exports = router;