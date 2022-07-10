const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const withAuth = require('../withAuth');
const secret = "pitichat";

const mail = require('../lib/mailing');
module.exports = (app, db)=>{
    
	const userModel = require('../models/userModel')(db)
	

	// enregistrement d'un membre
	app.post('/api/v1/user/save', async (req, res, next)=>{
	    //on check si l'email existe déjà
	    let check = await userModel.getUserByEmail(req.body.email)
	    if(check.length > 0){
	    res.json({status: 500, msg:"email deja existant", err: check})
	    }
	    console.log(req.body)
	    let user = await userModel.saveOneUser(req);
	    console.log("Register", user);
	    //si il existe
	    if(user.code) {
	    	//reponse json d'erreur
	       res.json({status: 500, msg:"user non sauvegarder", err: user})
	    }
	     //on enregistre
	   res.json({status:200 , msg : "l'utilisateur a bien été enregistré"})
	})
	
	
	// gestion de la connexion des membres (c'est ici qu'on va créer le token et l'envoyer vers le front)
	app.post('/api/v1/user/login', async (req, res, next)=>{
	    //on check si le mail de l'user correspond à un user de la bdd
	    let user = await userModel.getUserByEmail(req.body.email)
	
		//si il renvoi un tableau vide (il n'existe pas)
		if(user.length === 0){
			//on envoi une reponse d'erreur d'utilisateur innexistant
			res.json({status:404 , error: "Email inconnu"})
		}else{
			//on compare les deux mots de passes
		 bcrypt.compare(req.body.password, user[0].password)
	    	.then((same)=>{
	      		console.log('SAME', same);
	      		//si ça correspond
	      		if(same) {
	            //on va créer une const payload on stock les valeur qu'on va glisser dans le token (attention jamais d'infos sensibles)
	            const payload = {email:req.body.email , id: user[0].id}
	            //on crée le token avec sa signature secret
			    const token = jwt.sign(payload, secret);
			    console.log(token)
			    //reponse json avec le token qu'on renvoi vers le front
			    res.json({status:200 ,msg:"connecté", token:token , user:user[0]})
	        //sinon
			} else {
	            //on envoi une reponse json negative 401 avec mot de pass incorrect
	    	res.json({status:401 , error: "Mot de passe incorrect"})
	            }
	    	})
	    	.catch(err=>console.log("Echec comparaison mdp", err))
		}
	})
	
	
	
	// recuperation d'un utilisateur en fonction de son id
	app.get('/api/v1/user/:id' , async (req , res , next)=>{
		let user = await userModel.getOneUser(req.params.id)
		if(user.code){
			res.json({status:500 , msg:"récupération non réussi" , err:user})
		}
		res.json({status:200 , msg:"récupération réussi" , user:user[0]})
	}) 
	
	
	
	//modification des utilisateurs (modif profil)
	app.put('/api/v1/user/update/:id', withAuth , async (req, res, next)=>{
	    //on modifie les infos de l'utilisateur
	   
	  let user = await userModel.updateUser(req, req.params.id);
	  if(user.code) {
			res.json({status: 500, msg: "mise a jour non effectué" , err: user})
	  }
	    //on retourne ces infos vers le front
	  res.json({status: 200, user: user, msg: "Votre utilisateur a bien été modifié"})
	   
	})
	
	
	
	// recuperation d'un utilisateur en fonction de son mail
	app.get('/api/v1/user/email/:email' , async (req , res , next)=>{
		let result = await userModel.getIdByEmail(req.body.email)
		if(result.code){
			res.json({status:500 , msg:"récupération non réussi" , err:result})
		}
		res.json({status:200 , msg:"récupération réussi" , result:result})
	}) 
	
	
	//route de récupération de mot de passe oublié
    app.post('/api/v1/user/forgot', async (req, res, next)=>{
        //on modifie le key_id (par sécurité)
        let result= await userModel.updateKeyId(req.body.email)
        if(result.code){
             res.json({status: 500, msg: "nous n'avons pas pu envoyer un email", error: result});
        }
        //on récup la réponse du key_id
        let key_id=result.key_id;
     
        mail(
            req.body.email, 
            "changement de mot de passe", 
            "Mot de passe oublié ?", 
           'Pour modifier votre mot de passe, cliquez <a href="https://team-basket.herokuapp.com/api/v1/user/changePassword/'+key_id+'">ici<a/> !'
        );
        
        res.json({status:200 , msg:"email envoyé"})
    })
    
    
    //route d'affichage de la modification de mot de passe
    app.get('/api/v1/user/changePassword/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        
        res.render('forgot', {key_id: key_id, error: null})
    })
    
    
    //route de modification de mot de passe
    app.post('/api/v1/user/changePassword/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        let error = null
     
        if(req.body.password1 !== req.body.password2) {
            error = "Vos deux mots de passe ne sont pas identique !";
        } else {
           let result = await userModel.updatepassword(req.body.password1, key_id);
            if(result.code) {
                error = "le mot de passe ne s'est pas modifié !"
            } else {
               error = "le mot de passe a bien été modifié !"
            } 
        }
        res.render('forgot', {key_id: key_id, error: error})
    })
  
	      
}