const bcrypt = require('bcrypt');
const saltRounds = 10;
let randomId = require('random-id');
let len = 30;
let pattern = 'aA0'

module.exports = (_db)=>{
    db = _db;
    return UserModel;
}

class UserModel {
    
    // sauvegarde d'un membre
    static saveOneUser(req){
       
       //ATTENTION toujours crypter le mot de passe de l'utilisateur avent d'enregistrer les infos dans la bdd
        return bcrypt.hash(req.body.password, saltRounds)
        .then((hash)=> {
            //hash correspond au mot de passe crypté retourné comme promesse par la fonction bcrypt.hash
            console.log(hash)
            let key_id = randomId(len, pattern);
            let sql = 'INSERT INTO users (email, password, firstName, lastName , role , address , zip , city , phone , key_id , creationTimestamp ) VALUES (?, ?, ?, ? , "user" , ? , ? , ? , ? ,? , NOW())';
    
           return db.query(sql, [req.body.email, hash, req.body.firstName, req.body.lastName , req.body.address , req.body.zip , req.body.city , req.body.phone , key_id])
            .then((response)=>{
                return response
            })
            .catch((err)=>{
                return err
            })
          
        })
        .catch(err=>console.log("Echec bcrypt: ", err))  
    }
     //modification de la clé
    static async updateKeyId(email){
		let key_id = randomId(len, pattern);
		let user = await db.query('UPDATE users SET key_id = ? WHERE email = ?', [key_id, email]);
		
		let result = {key_id: key_id, user: user}

		return result;
	}
	
    // récupération d'un utilisateur en fonction de son mail
    static getUserByEmail(email) {
    let sql = 'SELECT * FROM users WHERE email = ?';
        return db.query(sql, [email])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
        
    }
    
    // récupération d'un utilisateur en fonction de son id
    static getOneUser(id) {
    let sql = 'SELECT * FROM users WHERE id = ?';
        return db.query(sql, [id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
        
    }
    
    //modification d'un user firstName, lastName, address, zip, city, phone
    static updateUser(req, id) {
         let sql = "UPDATE users SET firstName = ? , lastName=? , email=? , address=?  , zip=? , city=? , phone=? WHERE id =?" 
        return db.query(sql, [req.body.firstName , req.body.lastName , req.body.email, req.body.address , req.body.zip , req.body.city , req.body.phone , id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
    
     // récupération d'un id en fonction de son mail
    static getIdByEmail(email) {
    let sql = 'SELECT id FROM users WHERE email = ?';
        return db.query(sql, [email])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
     
    }
   
   	//modification du mot de passe
	static async updatepassword(newPassword, key_id){
	 return bcrypt.hash(newPassword, saltRounds)
        .then((hash)=> {
            //hash correspond au mot de passe crypté retourné comme promesse par la fonction bcrypt.hash
            console.log(hash)
        let sql ="UPDATE users SET password =? WHERE key_id=?"
        return db.query(sql , [hash , key_id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    })
        .catch(err=>console.log("Echec bcrypt: ", err))  
    }   
 
}
