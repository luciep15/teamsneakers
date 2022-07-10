import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {selectProduct, setProduct} from '../../slices/productSlice'
import {deleteOneProduct , getAllProduct , getOneProductRef , getOneProduct , getOneProductName} from '../../api/product'
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";


const Admin = (props)=>{
    
    //ici on va afficher les produits avec des liens pour ajouter éditer et supprimer
    const product = useSelector(selectProduct)
    const dispatch = useDispatch()
    const [error, setError] = useState(null);
    	
    const [value , setValue]=useState("")
    const [value2 , setValue2]=useState("")
    const [produit , setProduit]=useState("")
    
    
    useEffect(() => {
    //récupération de tous les produits (fonction api)
        getAllProduct()
        .then((response)=>{
             //envoi dans le store vers l'action pour mettre à jour les produits (dispatch)
            dispatch(setProduct(response.result));
        })
           //catch
         .catch(err=>console.log(err));   
    
    },[props])
    
    
    
    // fonction qui supprime un produit
	const onClickDeleteProduct = (id)=>{
		deleteOneProduct(id)
		.then((response)=>{
			if(response.status === 200){
			 console.log(response);
			  getAllProduct()
			  .then((response)=>{
			  	dispatch(setProduct(response.result))	
			  })
			  .catch(err=> console.log(err))
			}
        })	
        .catch(err=> console.log(err))
	}
	
	
	/*RECHERCHE PAR REFERENCE*/
	//fonction recuperation de la valeur
	const onChangeValue = (e)=>{
	setValue(e.currentTarget.value)
	}
	
	//fonction recherche la reference
    const onClickSearchProduit = (e)=>{
		e.preventDefault();
		getOneProductRef(value)
		.then((res)=>{
			console.log(res);
			if(res.result > []){
			setError(null)
			dispatch(setProduit(res.result));
			}else{
			setError("Référence non trouvé!")	
			}
		})
		.catch((err)=>
			console.log(err))
	}	
	
	
	/* RECHERCHE PAR NOM */
	//fonction recuperation de la valeur
	const onChangeValue2 = (e)=>{
	setValue2(e.currentTarget.value)
	}

	//fonction recherche par nom
	const onClickSearchProduitName = (e)=>{
		e.preventDefault();
		getOneProductName(value2)
		.then((res)=>{
			console.log(res);
			if(res.result > []){
			setError(null)
			dispatch(setProduit(res.result));
			}else{
			setError("Nom non trouvé!")	
			}
		})
		.catch((err)=>
			console.log(err))
	}	
	
    return (
        <div className="admin">
			<h2 className="titre">Admin</h2>
			
			<form>
    	        <input type="text"
    	        	placeholder="recherche par reference"
				    value={value}
					onChange={(e)=>{
					onChangeValue(e);
				}}
				/>
				<button
					className="button_recherche"
					onClick={(e)=>{
					onClickSearchProduit(e)
					}}
				>
			    chercher
				</button>
	    
				 <input type="text"
    	        	placeholder="recherche par nom"
				    value2={value}
					onChange={(e)=>{
					onChangeValue2(e);
				}}
				/>
				<button
					className="button_recherche"
					onClick={(e)=>{
					onClickSearchProduitName(e)
					}}
				>
			    chercher
				</button>
			</form>
	        {error !== null && <p className="msgError">{error}</p>}
    	   
     	    {/*RESULTAT DE LA RECHERCHE */}
	  	    {produit.length !== 0 && <table className="adminResultat">
			<caption>Résultat:</caption>
				<thead>
					<tr>
						<th>Image</th>
						<th>Nom</th>
						<th>Reference</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						 <td id="td-image"><CloudinaryContext cloudName="dapuyno3v">
			             <div>
				              <Image publicId={produit.photo}>
				                 <Transformation quality="auto" fetchFormat="auto" />
				              </Image>
			            </div>
			            </CloudinaryContext></td>
				        <td id="tdName">{produit.name}</td>
				        <td>{produit.reference}</td>
				        <td id="td-action">
				     	<Link to={"/editProduct/"+ produit.id}>Modifier</Link>
						<button
							onClick={(e)=>{
								onClickDeleteProduct(produit.id)
							}}
						>Supprimer</button>
					      </td>
					</tr>
				</tbody>
			</table>}	
			
				
				
			{/*TABLEAU DE TOUS LES PRODUITS*/}	
			<Link to="/addProduct">
				<i className="fa fa-plus-circle"></i>   Ajouter un produit
			</Link>
			<h3>Tableau de tous les produits</h3>
			<table className="table">
				<thead>
					<tr>
						<th>Image</th>
						<th>Nom</th>
						<th>Reference</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
				{/*Boucle d'affichage des produits*/}
	            {product.map((b)=>{
		            return(
		            <tr key={b.id}>
					      <td id="td-image"><CloudinaryContext cloudName="dapuyno3v">
				            <div>
				              <Image publicId={b.photo}>
				                <Transformation quality="auto" fetchFormat="auto" />
				              </Image>
				            </div>
				          </CloudinaryContext></td>
					      <td id="tdName">{b.name}</td>
					      <td>{b.reference}</td>
					      <td id="td-action">
					      <Link to={"/editProduct/"+ b.id}>Modifier</Link>
						  <button
							onClick={(e)=>{
								onClickDeleteProduct(b.id)
							}}
					   	  >Supprimer</button>
					      </td>
			        </tr>) 
	            })}
				</tbody>
			</table>
		</div>
    )
    
}


export default Admin;