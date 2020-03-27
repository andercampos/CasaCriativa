// Usei o express para criar e configurar o servidor
const express = require('express')
const server = express()

const db = require("./db")

// vetores / Array
/* const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        url: "https://rocketseat.com.br"
    },
    {
    }
] */

//configurar arquivos estáticos (css, scripts, imagens)

server.use(express.static("public"))

// habilitar uso do req.body
server.use(express.urlencoded({ extended:true }))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, //boolean
})

// Criei uma rota /
// capturo o pedido do cliente para responder
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err) {
            return console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse() //extrair conteudo do Array sem apenas referenciar com = ideas

        let lastIdeas = []
        for (let idea of reversedIdeas){
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        lastIdeas = lastIdeas.reverse()

        return res.render("index.html", { ideas: lastIdeas })
        })
})

server.get("/ideias", function(req, res){
    
    //req.query // ?title=asdasdd&category=asdasdf
    //res.send envia para o front end

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err) {
            return console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", { ideas: reversedIdeas})
    })
})

server.post("/", function(req, res){
    //inserir dados na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `
    const values = [
            req.body.image,
            req.body.title,
            req.body.category,
            req.body.description,
            req.body.link,
    ]

    db.run(query, values, function(err){
        if(err) {
            return console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
    })
})

// ligar o servidor na porta 3000
server.listen(3000)