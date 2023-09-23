import { promises as fs} from "fs";

export default class ProductManager {

    constructor(path) {
        this.path = path;
    }

    addProduct = async (product) => {

        try {
        
         const products = await this.getProducts();

            //Validaciones
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.log("Por favor ingrese todos los parámetros del producto");
            return;
        }else if(products.length==0){
            products.push(product);
            product.id=1;
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        }else if(products.length>0){
            const validarCodigo = products.find((producto)=> producto.code === product.code)
            if(validarCodigo == undefined){
                products.push(product);
                product.id = products.length;
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }else{
                console.log(`¡El producto con codigo code : ${product.code} ya existe, por favor verifique!`)
            }
        }

        return product;
            
        } catch (error) {
            console.log(error)
        }

    }

    getProducts = async () =>{
       try {
            const data = await fs.readFile(this.path, "utf-8");
            const products = JSON.parse(data);
            return products;        
        }        
        catch (error) {
        console.log(error);
        return [];
        }

    }

    // getProducts = async () =>{
    //     try {
 
    //      if(fs.existsSync(this.path)){
    //          const data = await fs.promises.readFile(this.path, "utf-8");
    //          const products = JSON.parse(data);
    //          return products;
    //      }else{
    //          return [];
    //      }
         
    //      } catch (error) {
    //      console.log(error)
    //      }
 
    //  }
    

    getProductsById = async (id) => {
        try {
            const respuestaId = await this.getProducts();
            const filterId = respuestaId.find(product => product.id===id)
    
            if(filterId === undefined){
                return console.log("NOT FOUND")
            }else{
                return filterId;
            }   
        } catch (error) {
            console.log(error)
        }     
    }

    deleteProductById = async (id) => {
        try {

            const filterDeleteId = await this.getProducts();
            const existId = filterDeleteId.filter(product => product.id === id)
            const filterProducts = filterDeleteId.filter(product => product.id != id)

            if(existId.length===0){
                return console.log("deleteProductById : El id especificado no existe");
            }else{
                await fs.promises.writeFile(this.path, JSON.stringify(filterProducts, null, '\t'));
                return filterProducts;
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }

    updateProduct = async ({id, ...product}) => {
        try {
            const productsAll = await this.deleteProductById(id);  
            const productUpdate =[{...product,id}, ...productsAll];
            await fs.promises.writeFile(this.path, JSON.stringify(productUpdate,null, '\t'));
            return productUpdate;
        } catch (error) {
            console.log(error);
        }

    }

    
}

// module.exports = {
//     ProductManager
// }