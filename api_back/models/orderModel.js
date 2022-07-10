 module.exports = (_db) => {
	db = _db

	return OrderModel
}


class OrderModel {
    //validation d'une commande
    static saveOneOrder(user_id, totalAmount) {
    let sql = 'INSERT INTO orders (user_id, totalAmount, creationTimestamp, status) VALUES (?,?, NOW(),"not payed")'   
    return db.query(sql, [user_id, parseInt(totalAmount)])
        .then((result)=>{
			return result;
		})
		.catch((err)=>{
				return err;
		})    
        
    }
    
    // sauvegarde d'un orderdetail
    static saveOneOrderDetail(order_id, product) {
        let total = parseInt(product.quantityInCart) * parseFloat(product.safePrice);
        //requête sql
        let sql='INSERT INTO orderdetails (order_id, product_id, quantity, size , total) VALUES (?, ?, ? ,? , ?)'
        return db.query(sql, [order_id, product.id, product.quantityInCart, product.size , total])
    		.then((result)=>{
    			return result;
    		})
    		.catch((err)=>{
    				return err;
    		})
    }
    
    // modification d'un montant total
    static updateTotalAmount(order_id, totalAmount) {
        let sql='UPDATE orders SET totalAmount = ? WHERE id=?'
        return db.query(sql, [totalAmount, order_id])
    		.then((result)=>{
    			return result;
    		})
    		.catch((err)=>{
    				return err;
    		})
    }
    
    // récupération d'une commande en fonction d'un id
    static getOneOrder(id) {
        let sql ='SELECT * FROM orders WHERE id =?'
        return db.query(sql, [id])
            .then((result)=>{
    			return result;
    		})
    		.catch((err)=>{
    				return err;
    		})
    }
    
    // modification du status d'une commande
    static updateStatus(orderId, status){
        let sql='UPDATE orders SET status =? WHERE id =?'
        return db.query(sql, [status, orderId])
			.then((result)=>{
				return result;
			})
			.catch((err)=>{
				return err;
			})
    }
    
     // récupération des commandes en fonction de l'utilisateur
    static getAllOrder(user_id) {
        let sql ='SELECT * FROM orders WHERE user_id =?'
        return db.query(sql, [user_id])
            .then((result)=>{
    			return result;
    		})
    		.catch((err)=>{
    				return err;
    		})
    }
    
    
     // récupération du detail d'une commande 
    static getDetailOrder(order_id) {
        let sql ='SELECT orderdetails.id, order_id, product_id, orderdetails.quantity, size, total, name , photo ,reference, price FROM orderdetails INNER JOIN product ON orderdetails.product_id = product.id WHERE order_id = ?'
        return db.query(sql, [order_id])
            .then((result)=>{
    			return result;
    		})
    		.catch((err)=>{
    				return err;
    		})
    }
    
}