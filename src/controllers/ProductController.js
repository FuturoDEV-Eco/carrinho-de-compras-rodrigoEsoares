const connection = require("../database/connection");

class ProductController {
  async create(request, response) {
    try {
      const data = request.body;

      if (!data.name || !data.category_id) {
        return response
          .status(400)
          .json({ message: "Nome e categoria são dados obrigatórios!" });
      }

      const product = await connection.query(
        `
                INSERT INTO products (name, amount, color, voltage, description, category_id, price)
                values($1, $2, $3, $4, $5, $6, $7)
                
                `,
        [
          data.name,
          data.amount,
          data.color,
          data.voltage,
          data.description,
          data.category_id,
          data.price,
        ]
      );

      response.json({ message: "Produto cadastrado com sucesso!" });
    } catch {
      response
        .status(500)
        .json({ message: "Não foi possível cadastrar o produto." });
    }
  }

  async listAll(request, response) {
    try {
      const dados = request.query;

      if (dados.name) {
        const data = await connection.query(
          `SELECT * from products  WHERE name ILIKE $1`,
          [`%${dados.name}%`]
        );
        response.status(200).json(data.rows);
        return;
      }
      const data = await connection.query(`SELECT * from products`);
      response.status(200).json(data.rows);
    } catch {
      response
        .status(500)
        .json({ message: "Não foi possível listar os produtos." });
    }
  }

  async listProduct(request, response) {
    try {
      const data = request.params;

      const product = await connection.query(
        `     SELECT
              categories.id as id_categoria,
              categories.name as categoria,
              products.name as nome_do_produto,
              products.amount as estoque,
              products.color as cor,
              products.description as descrição
              from
              products
              join
              categories on products.category_id = categories.id 
              and categories.id = $1      
      `,
        [data.id]
      );
      if (product.rowCount === 0) {
        return response
          .status(404)
          .json({ mensagem: "Não foi encontrado produto com esse id" });
      }
      response.json(product.rows[0]);
    } catch {
      response
        .status(500)
        .json({ mensagem: "Não foi possível localizar o produto!" });
    }
  }
}

module.exports = new ProductController();
