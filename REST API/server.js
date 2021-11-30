const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require("mysql");

var connection = mysql.createConnection({
	host: 'localhost',
	database: 'sicredi_locacao',
	user: 'root',
	password: '',
});

connection.connect();

app.use(express.json());
app.use(cors());

app.get('/getTotalVeiculos', async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET','OPTIONS');
	connection.query(`SELECT count(id) as total FROM veiculos`, function(error, results){
		if(error){
			res.status(404).send(error);
		}else{
			if(results.length === 0){
				res.status(204).send(error);
			}else{;
				res.status(200).send(results[0]);
			}
		}
	})
})

app.get('/getVeiculosIndispo', async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET','OPTIONS');
	connection.query(`SELECT count(id) as indispo FROM veiculos where disponivel = false`, function(error, results){
		if(error){
			res.send(error).status(404);
		}else{
			if(results.length === 0){
				res.status(204).send(error);
			}else{
				res.status(200).send(results[0]);
			}
		}
	})
})

app.get('/getLocacoes', async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET','OPTIONS');
	connection.query(`SELECT COUNT(ID) AS locacoes FROM locacoes;`, function(error, results){
		if(error){
			res.send(error).status(404);
		}else{
			if(results.length === 0){
				res.status(204).send(error);
			}else{
				res.status(200).send(results[0]);
			}
		}
	})
})

app.get('/getMeta', async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET','OPTIONS');
	connection.query(`SELECT metaInt as meta FROM meta`, function(error, results){
		if(error){
			res.send(error).status(404);
		}else{
			if(results.length === 0){
				res.status(204).send(error);
			}else{
				res.status(200).send(results[0]);
			}
		}
	})
})

app.post('/cadastrarVeiculo', async (req, res) =>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET','OPTIONS');
	var veiculo = req.body.veiculo;
	connection.query(`SELECT * FROM veiculos WHERE renavam = ${veiculo.renavam}`, function(error, dadosVeiculo){
		console.log(dadosVeiculo)
		if(dadosVeiculo.length === 0){
			connection.query(`INSERT INTO veiculos (placa, renavam, modelo, fabricante, ano, disponivel, categoria_idCategoria) VALUES ('${veiculo.placa}', ${veiculo.renavam}, '${veiculo.modelo}', '${veiculo.fabricante}', '${veiculo.ano}', ${veiculo.disponivel}, ${veiculo.categoria})`, function(error, results){
				if(error){
					console.log(error)
					res.send(error).status(404);
				}else{
					console.log(results)
					res.send(results).status(204);
				}
			})
		}else{
			res.send(dadosVeiculo).status(200)
		}
	})
})

app.post('/atualizarCadastroVeiculo', async (req, res) =>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET','OPTIONS');
	var veiculo = req.body.veiculo;
	connection.query(`SELECT id FROM veiculos WHERE renavam = ${veiculo.renavam}`, function(error, results){
		console.log(results)
		if(!error){
			var varId = results[0].id
			connection.query(`UPDATE veiculos SET placa = '${veiculo.placa}', modelo = '${veiculo.modelo}', fabricante = '${veiculo.fabricante}', ano = '${veiculo.ano}', disponivel = ${veiculo.disponivel}, categoria_idCategoria = ${veiculo.categoria} WHERE id = ${varId}`, function(error, results){
				if(error){
					res.send(error).status(404);
				}else{
					res.send('Sucesso').status(200);
				}
			})
		}
		else{
			console.log(error)
			res.send(error).status(404)
		}
	})
})

app.post('/inserirClientes', async (req, res) =>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET','OPTIONS');
	var cliente = req.body.cliente;
	connection.query(`SELECT * FROM clientes WHERE CPF = '${cliente.cpf}'`, function(error, dadosCliente){
		console.log(dadosCliente)
		if(dadosCliente.length === 0){
			connection.query(`INSERT INTO clientes (nome, CPF, CNH, CEP, rua, numero, cidade, estado, bairro, complemento, telefone, cartaoCredito, vencimentoCartao) VALUES ('${cliente.nome}', '${cliente.cpf}', '${cliente.cnh}', ${cliente.cep}, '${cliente.rua}', ${cliente.numero}, '${cliente.cidade}', '${cliente.estado}', '${cliente.bairro}', '${cliente.complemento}', '${cliente.telefone}', '${cliente.cartaoCredito}', '${cliente.vencimentoCartao}')`, function(error, results){
				if(error){
					console.log(error)
					res.send(error).status(404);
				}else{
					console.log(results)
					res.send(results).status(204);
				}
			})
		}else{
			res.send(dadosCliente).status(200)
		}
	})
})

app.post('/inserirLocacao', async (req, res) =>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET','OPTIONS');
	var veiculo = req.body.veiculo;
	connection.query(`SELECT * FROM veiculos WHERE renavam = ${veiculo.renavam}`, function(error, dadosVeiculo){
		console.log(dadosVeiculo)
		if(dadosVeiculo.length === 0){
			connection.query(`INSERT INTO veiculos (placa, renavam, modelo, fabricante, ano, disponivel, categoria_idCategoria) VALUES ('${veiculo.placa}', ${veiculo.renavam}, '${veiculo.modelo}', '${veiculo.fabricante}', '${veiculo.ano}', ${veiculo.disponivel}, ${veiculo.categoria})`, function(error, results){
				if(error){
					console.log(error)
					res.send(error).status(404);
				}else{
					console.log(results)
					res.send(results).status(204);
				}
			})
		}else{
			res.send(dadosVeiculo).status(200)
		}
	})
})

app.listen(3002, function(){
	console.log("Server is Running on port 3002");
});