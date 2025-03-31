const mongoose = require("mongoose");
// controllers/productoController.js
const Producto = require('../models/Producto');

// 🔹 Crear un novo produto
exports.crearProducto = async (req, res) => {
    try {
        let producto = new Producto({
            marca: req.body.marca,
            tipo_de_lapiz: req.body.tipo_de_lapiz,
            dureza: req.body.dureza,
            grosor: req.body.grosor,
            color:req.body.color,
            precio: req.body.precio,
            cantidad: req.body.cantidad ?? 0  // ✅ Se cantidad non se envía, inicialízase en 0
        });

        await producto.save();
        res.json(producto);
    } catch (error) {
        console.error("❌ Erro ao crear produto:", error);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};


exports.obtenerProductos = async (req, res) => {
    try {
        const { filtro, valor } = req.query;
        console.log("📌 Parámetros recibidos no backend:", { filtro, valor });

        let query = {};

        // ✅ Lista de campos válidos
        const camposValidos = ["_id", "marca", "tipo_de_lapiz", "dureza", "grosor", "color", "precio", "cantidad"];

        // 🔹 Se non hai filtro, devolvemos TODOS os produtos
        if (!filtro || !valor) {
            const productos = await Producto.find();
            return res.json(productos);
        }

        // 🔹 Se o filtro non é válido, devolvemos erro
        if (!camposValidos.includes(filtro)) {
            return res.status(400).json({ msg: "Filtro non válido" });
        }

        // 🔹 Se o filtro é `_id`, validamos que o valor sexa un `ObjectId` válido
        if (filtro === "_id") {
            if (!mongoose.Types.ObjectId.isValid(valor)) {
                return res.status(400).json({ msg: "ID non válido" });
            }
            query[filtro] = new mongoose.Types.ObjectId(valor);
        } 
        // 🔹 Se o filtro é `precio` ou `cantidad`, validamos que sexa numérico
        else if (filtro === "precio" || filtro === "cantidad" || filtro === "grosor") {
            if (isNaN(valor)) {
                return res.status(400).json({ msg: "O valor debe ser numérico" });
            }
            query[filtro] = Number(valor);
        } 
        // 🔹 Para cadeas de texto, usamos regex para buscar coincidencias
        else {
            // query[filtro] = { $regex: new RegExp(`^${valor}`, "i") };
            query[filtro] = { $regex: `^${valor}$`, $options: 'i' };

        }

        console.log("🔎 Consulta enviada a MongoDB:", JSON.stringify(query));

        const productos = await Producto.find(query);

        // 🔹 Se non hai resultados, devolvemos 404
        if (productos.length === 0) {
            return res.status(404).json({ msg: "Non se atoparon produtos co criterio indicado" });
        }

        console.log("✅ Produtos devoltos:", productos);
        res.json(productos);
    } catch (error) {
        console.error("❌ Erro ao obter produtos:", error);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};


// 🔹 Actualizar un produto por ID
exports.actualizarProducto = async (req, res) => {
    try {
        const { marca, tipo_de_lapiz, dureza, grosor, color, precio, cantidad } = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'Produto non atopado' });
        }

        producto.marca = marca;
        producto.tipo_de_lapiz = tipo_de_lapiz;
        producto.dureza = dureza;
        producto.grosor=grosor;
        producto.color=color;
        producto.precio = precio;
        producto.cantidad = cantidad;

        producto = await Producto.findOneAndUpdate(
            { _id: req.params.id },
            producto,
            { new: true }
        );

        res.json(producto);
    } catch (error) {
        console.error("❌ Erro ao actualizar produto:", error);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};

// 🔹 Obtener un produto por ID
exports.obtenerProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'Produto non atopado' });
        }

        res.json(producto);
    } catch (error) {
        console.error("❌ Erro ao obter produto:", error);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};

// 🔹 Eliminar un produto por ID
exports.eliminarProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'Produto non atopado' });
        }

        await Producto.findOneAndDelete({ _id: req.params.id });
        res.json({ msg: 'Produto eliminado con éxito' });
    } catch (error) {
        console.error("❌ Erro ao eliminar produto:", error);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};
