const fs = require('fs');
const { title } = require('process');

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async save(objData) {
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8');
            const dataParse = JSON.parse(data);
            let arrayProds = [...dataParse, { ...objData, id: dataParse.length + 1 }];
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8');
            console.log(`El id del nuevo producto es: ${dataParse.length + 1}`);
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8');
            const dataParse = JSON.parse(data);
            let producto = dataParse.find(producto => producto.id === id);
            if (producto) {
                console.log(producto);
            } else {
                console.log('El producto no existe');
            }

        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8');
            const dataParse = JSON.parse(data);
            console.log(dataParse);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8');
            const dataParse = JSON.parse(data);
            let producto = dataParse.find(producto => producto.id === id);
            if (producto) {
                let arrayProds = dataParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8');
                console.log(`El producto ${title} con id ${id} ha sido borrado`);
            } else {
                console.log('El producto no existe');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            let arrayProds = []
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8');
            console.log('Todos los productos han sido eliminados');
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = Contenedor
