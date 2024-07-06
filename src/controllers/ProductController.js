
const connection = require('../database/connection')



class ProductController{

    async create(request, response){

        try {

            const data = request.body

            if(!data.name || !data.category_id){
                return response.status(400).json({message: "Nome e categoria são dados obrigatórios!"})
            }

         
            const product  = await connection.query(`
                INSERT INTO products (name, amount, color, voltage, description, category_id, price)
                values($1, $2, $3, $4, $5, $6, $7)
                
                `, [data.name, data.amount, data.color, data.voltage, data.description, data.category_id, data.price])

                response.json({message: "Produto cadastrado com sucesso!"})

            
        } catch {
            
            response.status(500).json({message: "Não foi possível cadastrar o produto."})
        }

    }
}

module.exports = new ProductController()