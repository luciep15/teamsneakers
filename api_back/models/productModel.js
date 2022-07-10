module.exports = (_db)=>{
    db = _db;
    return ProductModel;
}

class ProductModel {
    
    
    // récupération des produits
    static getAllProduct() {
    let sql = "SELECT * FROM product";
	return db.query(sql ,[])
	.then((response)=>{
	    return response
	})
   .catch((err)=>{
       return err
    })   
    }
    
     // récupération des derniers produits ajoutés
    static getNewAllProduct() {
    let sql = "SELECT * FROM product ORDER BY id DESC LIMIT 5";
	return db.query(sql ,[])
	.then((response)=>{
	    return response
	})
   .catch((err)=>{
       return err
    })   
    }
    
    
    // récupération d'un produit en fonction de son id
    static getOneProduct(id) {
    let sql = 'SELECT * FROM product WHERE id= ?'
    return db.query(sql ,[id])
	.then((response)=>{
	    return response
	})
    .catch((err)=>{
       return err
    })      
    }
    
    
    // récupération des produits en fonction de sa category
    static getCatProduct(category_id) {
    let sql = 'SELECT * FROM product WHERE category_id=?'
    return db.query(sql ,[category_id])
	.then((response)=>{
	    return response
	})
    .catch((err)=>{
       return err
    })      
    }
    
    
    // récupération des produits en fonction de sa sous_category
    static getOneCatProduct(sous_category_id) {
    let sql = 'SELECT * FROM product WHERE sous_category_id=?'
    return db.query(sql ,[sous_category_id])
	.then((response)=>{
	    return response
	})
    .catch((err)=>{
       return err
    })      
    }
    
    
    // récupération d'un produit en fonction de sa reference
    static getOneProductRef(reference) {
    let sql = 'SELECT * FROM product WHERE reference=?'
    return db.query(sql ,[reference])
	.then((response)=>{
	    return response
	})
    .catch((err)=>{
       return err
    })      
    }
    
    
    // récupération d'un produit en fonction de son nom
    static getOneProductName(name) {
    let sql = 'SELECT * FROM product WHERE name=?'
    return db.query(sql ,[name])
	.then((response)=>{
	    return response
	})
    .catch((err)=>{
       return err
    })      
    }
    
    
     // sauvegarde d'un produit
    static saveOneProduct(req){
    let sql= 'INSERT INTO product (name , reference ,description , price , photo, quantity , category_id , sous_category_id , creationTimestamp) VALUES (?, ? , ? , ? , ? , ? , ? , ? , NOW())'
    return db.query(sql ,[req.body.name , req.body.reference , req.body.description , req.body.price , req.body.photo , req.body.quantity , req.body.category_id , req.body.sous_category_id])
	.then((response)=>{
	    return response
	})
    .catch((err)=>{
       return err
    })      
    }
    
    
    // modification d'un produit
    static updateOneProduct(req, id) {
    let sql='UPDATE product SET name=?,reference =? , description=? , price=?  , quantity=?  , category_id=? , sous_category_id=? WHERE id=?';
    return db.query(sql, [req.body.name, req.body.reference ,req.body.description , req.body.price ,req.body.quantity , req.body.category_id , req.body.sous_category_id, id])
    .then((response)=>{
        return response;
    })
    .catch((err)=>{
        return err;
    })      
    }
    
    
    // modification d'une photo
	static updateImg(req) {
    return db.query('UPDATE product SET photo = ? WHERE id = ?', [req.body.photo, req.body.id])
	.then((result)=>{
		return result;
	})
	.catch((err)=>{
		return err;
	})
	}
	
	
    // suppression d'un produit
    static deleteOneProduct(id) {
    let sql = "DELETE FROM product WHERE id = ?";
    return db.query(sql, [id])
    .then((response)=>{
        return response;
    })
    .catch((err)=>{
        return err;
    })       
    }
}