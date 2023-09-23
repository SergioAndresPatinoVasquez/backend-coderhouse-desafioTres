import express from 'express';
import ProductManager from '../products/productManager.js';

const app = express();
app.use(express.urlencoded({extended : true}));

const manager = new ProductManager('./files/Productos.json');

app.get("/products", async(req, res)=>{
    const products = await manager.getProducts();
    let limit = Number(req.query.limit);

    if(!limit){
        return res.send(products);
    } 
    
    let productsLimit = products.slice(0,limit);
    res.send(productsLimit);
    
});

app.get("/products/:id", async(req, res)=>{
    const products = await manager.getProducts();
    let id = Number(req.params.id);
    let productById = products.find(product => product.id === id)
    if (!productById) return res.send({error: 'Producto no encontrado'});
    res.send(productById);
    
});

app.listen(8080, () => console.log('Listening On Port 8080'));