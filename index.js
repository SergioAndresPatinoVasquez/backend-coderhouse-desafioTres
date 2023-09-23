const {
    ProductManager
} = require("./products/productManager");

//const manager = new ProductManager('./files/Productos.json');

const env = async () => {
    const productos = await manager.getProducts();
    console.log("Los productos en el archivo .json son : ", productos);

//     const product = {
//         title: 'producto prueba8',
//         description: 'este es un producto prueba8',
//         price: 800,
//         thumbnail: 'sin imagen8',
//         code: '8abc123',
//         stock: 32
//     };

// const productsResult = await manager.addProduct(product);
    // console.log("* Agregando el producto", productsResult);

    // const productId = await manager.getProductsById(2);
    // console.log("* getProductsById : El producto con el id especificado es:", productId);

    // const updateProduct = {
    //     title: 'update product',
    //     description: 'update',
    //     price: 500,
    //     thumbnail: 'sin imagen',
    //     code: 'abc123',
    //     stock: 25,
    //     id: 1
    // };

    // const update = await manager.updateProduct(updateProduct);
    // console.log(`updateProduct con el id : ${updateProduct.id}`, update);

    // const deleteId = await manager.deleteProductById(3);
    // console.log("deleteProductById - Eliminando el producto con el id especificado", deleteId);
}

env();