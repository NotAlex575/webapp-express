//importo express
const express = require('express');

//creo l'instanza dell'app attraverso il metodo express che ho importato
const connection = require("./data/db");
const app = express();

//definisco il numero di porta sul cui deve girare l'applicazione
const port = 3000;

//importo il router
const moviesRouter = require("./routers/moviesRouter");
const errorsHandler = require("./middlewares/errorsHandler.js");
const notFound = require("./middlewares/notFound.js");

//definisco la rotta base
app.get("/", (req,res) =>{
    res.send("rotta base del mio blog")
});

//definisco le rotte per i movies
app.use("/movies", moviesRouter);

//utilizzo globalmente il middleware errorsHandler
app.use(errorsHandler);
//utilizzo globalmente il middleware notFound         
app.use(notFound);

//esempio utilità di notFound: inserisci questa route in basso su postman (GET)
//http://localhost:3000/pippo
//qui darà come risposta "pagina non trovata"

//dico al server di rimanere in ascolto sulla porta 3000
app.listen(port, () =>{
    console.log(`server in ascolto nella porta ${port}`);
});