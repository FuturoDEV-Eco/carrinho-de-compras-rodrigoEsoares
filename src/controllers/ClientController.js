
const connection = require('../database/connection')



class ClientController{

    async create(request, response){

        try {

            const data = request.body

            if(!data.name || !data.email || !data.cpf || !data.contact){
                return response.status(400).json({message: "Nome, email, cpf e contato são dados obrigatórios!"})
            }

            const db_clients = await connection.query(`
                SELECT * from clients where cpf = $1 or email = $2
                `, [data.cpf, data.email])

                if(db_clients.rowCount !== 0){
                    return response.status(400).json({message: "cpf ou email já cadastrados"})
                }

            const client  = await connection.query(`
                INSERT INTO clients (name, email, cpf, contact)
                values($1, $2, $3, $4)
                returning *
                `, [data.name, data.email, data.cpf, data.contact])

                response.json({message: "Cliente cadastrado com sucesso!"})

            
        } catch {
            
            response.status(500).json({message: "Não foi possível cadastrar o cliente."})
        }

    }
}

module.exports = new ClientController()