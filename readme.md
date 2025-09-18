 esercizio di oggi: Setup Web App Express
 
 repo: webapp-express
 
 ### Esercizio
 
 Ciao ragazzi, è ora di mettere alla prova le vostre conoscenze iniziando a costruire la vostra prima app completa! Ecco i primi step
 
 
Utilizzando il file in allegato, creiamo un database con MySQL Workbench,
Creiamo una nuova applicazione Express,
Colleghiamo l’app al db e verifichiamo che tutto funzioni,
Prepariamo una rotta index per ottenere la lista dei film,
Prepariamo una rotta show per ottenere i dettagli di un singolo film e le sue recensioni

### Bonus

,
Inserire delle immagini nel progetto express,
Inserire i dati di connessione al database come variabili d’ambiente,
Inserire le vostre API in controller,
Inserire le vostre rotte in un router,
Inserire un middleware per le rotte inesistenti,
Inserire un middleware per la gestione errori

___________________________________________________________


STEPLIST CREAZIONE WEBAPP LIBRERIA (PASSO PER PASSO)

Questa webapp avrà un db di film a cui possiamo inserire delle recenzioni!

iniziamo con i passaggi per crearla!

1) DATABASE

creiamo il db su MySQL Workbench!

   ecco i passaggi iniziali:

   1) se non hai ancora creato un Mysql connector, creiamone subito uno!

      1) aprire Mysql Workbench 

      2) vicino a MySQL Connectors cliccare il + alla sua destra

      3) inserire il nome della connection name (puoi mettere quello che vuoi)

      4) inserisci lo username (questo ci servirà dopo, siccome dovremmo poi inserire questo dato nel progetto)

      5) fai il test connection e vedi se è andato tutto correttamente

      6) clicca ok

      *ora abbiamo il connector per il db!*

   2) ora che abbiamo il Mysql connector, andiamo a cliccarlo ed entriamoci!

    per creare un database segui questi passaggi:

       1) nella barra a sinistra (SCHEMAS), clicca col tasto destro del mouse (sotto a tutto) e clicca "create schema..."

       2) inserisci il nome del database (in questo caso db_movies)

       3) clicca apply e il gioco è fatto!

   3) importiamo il database dell'esercizio

       1) seleziona il tuo database vuoto

       2) in alto a destra, clicca su Server, e vai su Data Import

       3) seleziona la dicitura "import from Self-Contained-File"

       4) clicca dove stanno i [...] per selezionare il file da importare

       5) scegli il file.sql che tiene il database

       6) in "Default Target Schema", seleziona "db_movies" 

       7) fatto ciò, clicca su start import

    se tutto va bene, avrai importato il tuo database, e ti dovrebbe mostrare "Import completed" senza errori!

__________________________________________________________

2) CREAZIONE PROGETTO WEBAPP

    dopo creato il db, creiamo il nostro progetto attraverso questa steplist:

    1) Creo la cartella del progetto e la apro con vscode per lanciare il comando npm init e, quando compare la voce "entry point: ", inseriamo app.js

    2) Eseguo i seguenti comandi:
     
       1) npm install express
       
       2) npm install mysql2 

    3) Se non presente creiamo il file .gitignore in cui mettere la cartella node_modules (se devi importare in git questo è il momento, in modo tale che non importi subito il node_modules)

    4) Aggiorno il file package.json inserendo i comandi start (node app.js) e watch (node --watch app.js)

        struttura:

        "scripts": {
        "start": "node app.js",
        "watch": "node --watch app.js",
        "test": "echo \"Error: no test specified\" && exit 1"
        },

    5) Creo il file app.js:

        Scriviamo nel nostro app.js i comandi necessari per importare express, utilizzarlo e creare la rotta base nonché mettere in ascolto il server su una porta definita da noi (tipicamente la 3000)

        1) Importiamo express:
            const express = require('express');

        2) Definiamo la variabile app che contiene un’istanza di express:
            const app = express();

        3) Definiamo la porta sulla quale deve rimanere in ascolto il server:
            const port = 3000;

        4) Definiamo la rotta base della nostra applicazione:
            app.get('/', (req, res) => { /* codice */ })

        5) Diciamo al server di rimanere in ascolto sulla porta 3000:
            app.listen(port, () => { /* messaggio */ })
        
        6) creo la cartella data, con all'interno il file db.js

        *questo servirà a noi per collegarci direttamente al database che abbiamo!*

        il suo contenuto sara questo:

        __

            // importiamo mysql2
            const mysql = require("mysql2");

            // creo la connessione 
            // NOTA: in password, user e database, inserisci i dati che hai messo quando hai creato il MySQL Connections!

            const connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "password", 
                database: "db_movies",
                port: 3306
            });

            // stabilisco la connessione al db
            connection.connect((err) => {
                if (err) {
                    console.log(`Errore nella connessione al db: ${err}`);
                } else {
                    console.log("Connessione al db avvenuta correttamente");
                }
            });

            //esporto connection
            module.exports = connection;

        __

        7) in app.js, sotto a const express, ci aggiungiamo questo:

            //connessione con il database in app.js
            const connection = require("./data/db");

        *cosi app.js sarà collegato col database!*
   

__________________________________________________________

3) CREAZIONE CONTROLLER:

     1) creiamo una cartella controllers e ci mettiamo un file chiamato moviesController.js, dove al suo interno inseriremo tutte le query!

    2) creiamo le varie constanti (index, show, ...)

      struttura:

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

      *index e show, alla fine, non avranno questi contenuti, ma iniziamo almeno a creare uno scheletro all'interno del controller!*

____________________________________________________

5) ROUTER

  creiamo ora il router di movies, in questo caso creiamo la cartella routers con il file moviesRouter.js

    al suo interno:

      // importiamo express
      const express = require('express');

      // importiamo router
      const router = express.Router();

      // importiamo il controller
      const moviesController = require("../controllers/moviesController");

      // definizione delle rotte
      // index
      router.get('/', moviesController.index);

      // show
      router.get('/:id', moviesController.show);

      module.exports = router;

    *questi ci serviranno poi su postman per vedere i risultati!*

    creato quindi il router, andiamo in app.js e importiamo il router!

      //importo il router
      const moviesRouter = require("./routers/moviesRouter");

      //definisco le rotte per i movies
      app.use("/movies", moviesRouter);