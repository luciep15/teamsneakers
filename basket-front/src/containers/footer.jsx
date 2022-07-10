import React from 'react';

const Footer =(props)=>{

	
	return (
		<div className="footer">
			<div className="footer1">
	    	 <ul>
	           <li><i className="fas fa-lock"></i> paiement sécurisé</li>
	           <li><i className="fas fa-money-check-dollar"></i> carte de fidélité</li>
	           <li><i className="fas fa-truck"></i> ma livraison offerte</li>
	           <li><i className="fas fa-phone"></i> service client</li>
	           <li><i className="fas fa-check-circle"></i>garantie qualité</li>
	    	 </ul>
			 </div>
	         <div className="footer2">
	            <div>
	                   <a href="https://facebook.com"><i className="fab fa-facebook-square"></i></a>
	                   <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
	                   <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
	                   <a href="https://youtube.com"><i className="fab fa-youtube"></i></a>
	            </div>
	            <p>© 2022 Team sneakers - All rights Reserved</p>
	          </div>
	          
		</div>
		)
}

export default Footer;