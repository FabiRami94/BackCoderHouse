
let nextId = 1;

class ProductManager {

    constructor(title, description, price, thumbnail, code, stock){
        this.products = [];
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

    addProduct(title, description, price, thumbnail, code, stock){

        
        if(!title || !description || !price || !thumbnail || !code || !stock){
            throw new Error("Faltan datos!!!")
        }
        
        if(this.products.some(product => product.code === code)){
            throw new Error(`Ya existe el código ${code}.`);
        }

        //Forma 1.
        // let id;
        // id = this.products.length + 1;

        //Forma 2.
        const id = nextId;
        nextId++;

        this.products.push({
            id,
            title, 
            description,
            price,
            thumbnail,
            code,
            stock
        })  
    }

    getProducts(){
        return this.products
    }

    getProductById(id){

        if(!id){throw new Error("El campo no debe estar vacio!")}

        if(typeof id !== 'number'){throw new Error("Debe ser un número!")}

        if(this.products.length === 0){throw new Error("No hay ningún producto!")}

        for(let i = 0; i < this.products.length; i++){
            
            //Forma 1.
            // const product = this.products[id - 1];

            const product = this.products.filter(product => product.id === id);

            if(product.length === 0){throw new Error('No hay productos con esa ID')};

            return product;
        }
    }
};



const product = new ProductManager();

product.addProduct(
    'Jabón', 
    'Pieza para lavar la piel', 
    '5 USD', 
    'Imagen URL', 
    '101', 
    '5 Unds');

product.addProduct(
    'Shampoo', 
    'Pieza para lavar el cabello', 
    '12 USD', 
    'Imagen URL', 
    '102', 
    '10 Unds');

console.log(product.getProducts());
console.log(product.getProductById(3));
