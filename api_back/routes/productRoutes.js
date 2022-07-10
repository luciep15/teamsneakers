const fs = require('fs');
const withAuth = require('../withAuth');


module.exports = (app, db)=>{
    
	const productModel = require('../models/productModel')(db)
	
	// route permettant de récupérer tous les produits
	app.get("/api/v1/allproduct", async (req, res, next)=>{
	    let allproduct = await productModel.getAllProduct();
	    if(allproduct.code){
	  res.json({status:500 , msg:"la recuperation a echoué" , err:allproduct})
	  }
	   res.json({status: 200, msg: "recuperation reussi" , result:allproduct})
	})
	
	
	// route permettant de récupérer les 5 derniers produits
	app.get("/api/v1/newallproduct", async (req, res, next)=>{
	    let newproduct = await productModel.getNewAllProduct();
	    if(newproduct.code){
	  res.json({status:500 , msg:"la recuperation a echoué" , err:newproduct})
	  }
	   res.json({status: 200, msg: "recuperation reussi" , result:newproduct})
	})
	
	
	// route permettant de récupérer un produit en fonction de son id
	app.get("/api/v1/product/:id" , async (req , res ,next)=>{
	    let product = await productModel.getOneProduct(req.params.id);
	    if(product.code){
	  res.json({status:500 , msg:"la recuperation a echoué" , err:product})
	  }
	   res.json({status: 200, msg: "recuperation reussi" , result:product[0]})
	})
	
	
	// route permettant de récupérer des produits en fonction de sa category
	app.get("/api/v1/product/all/:category_id" , async (req , res ,next)=>{
	    let product = await productModel.getCatProduct(req.params.category_id);
	    if(product.code){
	  res.json({status:500 , msg:"la recuperation a echoué" , err:product})
	  }
	   res.json({status: 200, msg: "recuperation reussi" , result:product})
	})
	
	
	// route permettant de récupérer des produits en fonction de sa sous_category
	app.get("/api/v1/product/all/cat/:sous_category_id" , async (req , res ,next)=>{
	    let product = await productModel.getOneCatProduct(req.params.sous_category_id);
	    if(product.code){
	  res.json({status:500 , msg:"la recuperation a echoué" , err:product})
	  }
	   res.json({status: 200, msg: "recuperation reussi" , result:product})
	})
	
	
	// route permettant de récupérer un produit en fonction de sa reference
	app.get("/api/v1/product/one/:reference" , async (req , res ,next)=>{
	    let product = await productModel.getOneProductRef(req.params.reference);
	    if(product.code){
	  res.json({status:500 , msg:"la recuperation a echoué" , err:product})
	  }
	   res.json({status: 200, msg: "recuperation reussi" , result:product[0]})
	})
	
	
		// route permettant de récupérer un produit en fonction de son nom
	app.get("/api/v1/product/one/name/:name" , async (req , res ,next)=>{
	    let product = await productModel.getOneProductName(req.params.name);
	    if(product.code){
	  res.json({status:500 , msg:"la recuperation a echoué" , err:product})
	  }
	   res.json({status: 200, msg: "recuperation reussi" , result:product[0]})
	})
	
	
	// route permettant d'enregister un produit
	app.post("/api/v1/product/save", withAuth,  async (req , res , next)=>{
	   let product= await productModel.saveOneProduct(req); 
	   if(product.code){
	  res.json({status:500 , msg:"l'enregistrement a echoué" , err:product})
	  }
	   res.json({status: 200, msg: "enregistrement reussi" , result:product})
	})
	
	
	 //route modification d'une image
    app.post('/api/v1/product/updateImg', withAuth, async (req, res, next)=>{
		let product = await productModel.updateImg(req);

		if(product.code) {
			res.json({status: 500, error : product})
		}

		res.json({status: 200, result: product})
	})
	
	
	// route permettant de modifier un produit
	app.put("/api/v1/product/update/:id" ,withAuth,  async (req , res , next)=>{
	    let product= await productModel.updateOneProduct(req, req.params.id); 
	    if(product.code){
	  res.json({status:500 , msg:"mise a jour non effectué" , err:product})
	  }
	    //on retourne ces infos vers le front
	  res.json({status: 200, result: product , msg: "Votre produit a bien été modifié"})
	   
	})
	
	
	//route de suppression d'un produit
	app.delete("/api/v1/product/delete/:id", withAuth,  async (req , res , next)=>{
		let id = req.params.id;
		let product= await productModel.deleteOneProduct(id)
		if(product.code){
		res.json({status:500 , msg:"il y a un probleme" , err:product})	
		}
		res.json({status: 200, msg: "delete success id: "+ id , result:product})
				
			})

}