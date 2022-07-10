const express = require('express');
const app = express();

//parse les url
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//on recup tout le dossier public (css, fonts, img, js)
app.use(express.static(__dirname + '/public'));
// on gère l'affichage des templates front
app.set('views', './views');
app.set('view engine', 'ejs');


const mysql = require('promise-mysql');
const cors = require('cors');
app.use(cors());
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    createParentPath: true
}));



//middleware: une fonction qu'on va par la suite utiliser dans nos routes api pour controller si l'utilisateur peut executer le code de la route ou non (ici ce sera le fichier withAuth pour vérifier l'authentification de l'utilisateur)

//test de middleware
const myModule = require('./testModule');
myModule();

//on check si l'api est en ligne ou non et on décide quelle bdd on récupère
if(!process.env.HOST_DB) {
	var config = require('./config-exemple')
} else {
	var config = require('./config')
}


//récup de toutes mes routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

// connexion BDD
const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;
const port = process.env.PORT_DB || config.db.port;

console.log(host, database, user, password, port)

mysql.createConnection({
	host: host,
	database: database,
	user: user,
	password: password,
	port: port
}).then((db) => {
    console.log('connecté bdd');
	setInterval(async function () {
		let res = await db.query('SELECT 1');
	}, 10000);
	
	app.get('/', (req, res, next)=>{
	   
		res.json({status: 200, results: "welcome to api"})
	   
    })
	// toutes les routes sont dans des modules 
	userRoutes(app,db)
	productRoutes(app,db)
	orderRoutes(app,db)
	authRoutes(app,db)
})
.catch(err=>console.log("Echec connexion BDD: ", err))


const PORT = process.env.PORT || 9500;
app.listen(PORT, ()=>{
	console.log('listening port '+ PORT +' all is ok');
})