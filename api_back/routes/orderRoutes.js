const stripe = require('stripe')('sk_test_51Kk6qpFPK4LLYsZ2SnelHX0jnhwbw4BpGvDunC3mUf4VgdmOhEfxnh53gfOFHBjBeEvRz2pScHMZqakRqYVhkBNz00wGiTfNqv');
const withAuth = require('../withAuth');

module.exports = function (app, connection) {
    const orderModel = require('../models/orderModel')(db);
	const productModel = require('../models/productModel')(db);
    
    //sauvegarde une commande
    app.post('/api/v1/order/save', withAuth, async (req, res, next)=>{
        let totalAmount = 0;
        //enregistrement de l'order
        let orderInfos = await orderModel.saveOneOrder(req.body.user_id, totalAmount)
        //on recup l'id généré par l'enregistrement de l'order insertId
        let id = orderInfos.insertId;
        
        //enregistrement des orderdetails
        req.body.basket.map(async (b, index)=>{
            //je récupère les infos du produit pour chaque tour de boucle
            let product = await productModel.getOneProduct(b.id);
            //je rajoute le prix dans l'objet de mon produit sur la boucle
            b.safePrice = parseFloat(product[0].price);
            //je sauvegarde la ligne de ce produit acheté
            let detail = await orderModel.saveOneOrderDetail(id, b);
            //j'ajoute le prix total pour ce produit
            totalAmount += parseInt(b.quantityInCart) * parseFloat(b.safePrice);
            //mise à jour du montant total de la commande
            let udpate = await orderModel.updateTotalAmount(id, totalAmount);
        })
         res.json({status: 200, orderId:id})
    })
    
    
    // gestion du paiement
    app.post('/api/v1/order/payment', withAuth, async (req, res, next)=>{
        //récup d'une commande
        let order = await orderModel.getOneOrder(req.body.orderId);
        //on lance un suivis du paiement
        const paymentIntent = await stripe.paymentIntents.create({
	        amount: order[0].totalAmount* 100,
	        currency: 'eur',
	        // Verify your integration in this guide by including this parameter
	        metadata: {integration_check: 'accept_a_payment'},
	        receipt_email: req.body.email,
	      });
        
        
        //res json le client secret du payment intent
        res.json({client_secret: paymentIntent['client_secret']})
    })
    
    
    // validation du paiement dans un order
    app.put('/api/v1/order/validate', withAuth, async (req, res, next)=>{
        
        let validate = await orderModel.updateStatus(req.body.orderId, req.body.status)
        if(validate.code){
            res.json({status:500, msg: "Status de la commande non modifiée", err: validate})
        }
		res.json({status: 200, msg: "paiement validé"})
    })
    
    //recuperation des commandes d'un utilisateur
    app.get('/api/v1/orders/:user_id' ,withAuth ,  async (req , res , next)=>{
        let orders = await orderModel.getAllOrder(req.params.user_id);
        if(orders.code){
	  res.json({status:500 , msg:"la recuperation a echoué" , err:orders})
	  }
	   res.json({status: 200, msg: "recuperation reussi" , result:orders})
    })
    
    
     //recuperation d'une commande d'un utilisateur
    app.get('/api/v1/oneOrder/:id'  , withAuth, async (req , res , next)=>{
        let order = await orderModel.getOneOrder(req.params.id);
        if(order.code){
	  res.json({status:500 , msg:"la recuperation a echoué" , err:order})
	  }
	   res.json({status: 200, msg: "recuperation reussi" , result:order[0]})
    })
    
    
    //recuperation du detail d'une commande
    app.get('/api/v1/detailOrders/:order_id' , withAuth , async (req , res , next)=>{
        let orders = await orderModel.getDetailOrder(req.params.order_id);
        if(orders.code){
	  res.json({status:500 , msg:"la recuperation a echoué" , err:orders})
	  }
	   res.json({status: 200, msg: "recuperation reussi" , result:orders})
    })
}

   