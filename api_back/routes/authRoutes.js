const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
let config;
if(!process.env.HOST_DB) {
   config = require('../config')
}else {
   config = require('../config-exemple')
}
let secret = process.env.TOKEN_SECRET || config.token.secret;
const withAuth = require('../withAuth');


module.exports = (app, db)=>{
    const userModel = require('../models/userModel')(db);

   app.get('/api/v1/checkToken', withAuth, async (req, res, next)=>{
        let user = await userModel.getOneUser(req.id); 
        console.log(user);
        if(user.code){
            res.json({status:500 , error:user})
        }
        res.json({status: 200, msg: "token valide ", user: user[0]})
    })

}