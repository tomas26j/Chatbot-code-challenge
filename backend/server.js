const app = require('./app');
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGODB_URI;

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

async function loadInitialData() {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(sushiProducts);
            console.log('Datos iniciales cargados exitosamente');
        } else {
            console.log('La base de datos ya contiene productos');
        }
    } catch (err) {
        console.error('Error al cargar datos iniciales:', err);
    }
}

mongoose.connect(DB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await loadInitialData();
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));