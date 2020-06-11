const express = require('express');
const app = express();

const db = require('./database/db');

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

const nunjucks = require('nunjucks');
app.set("view engine", "njk");
nunjucks.configure('src/views', {
    express: app,
    autoescape: false,
    noCache: true
});

app.get("/", (request, response) => {
    return response.render("index.html")
})

app.get("/create-point", (request, response) => {
    return response.render("create-point.html")
})

app.post("/savepoint", (request, response) => {
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values = [
        request.body.image,
        request.body.name,
        request.body.address,
        request.body.address2,
        request.body.state,
        request.body.city,
        request.body.items,
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)   
        return response.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

app.get("/search", (request, response) => {
        
    const search = request.query.search
    if(search == "") {
        return response.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE state = '%${search}%'`, function(err, rows) {
        if(err) {
            console.log(err)
        }
        
        const total = rows.length;

        return response.render("search-results.html", { places: rows, total: total })
    })
});


app.listen(3000);