//importiamo la connessione la db
const connection = require("../data/db");

//index
const index = (req, res) => {
    console.log("Metodo index")
}

//show
const show = (req, res) => {
    console.log("Metodo show")
}

module.exports = {
    index,
    show
}  