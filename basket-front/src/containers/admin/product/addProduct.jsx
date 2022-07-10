import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {saveOneProduct , getAllProduct} from '../../../api/product';
import {Link} from 'react-router-dom';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../slices/productSlice";


const AddProduct = (props)=>{
    
    const dispatch = useDispatch();
    
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [msg , setMsg] = useState(null);
      
    //création des states du formulaire
    const [name, setName] = useState("");
    const [reference , setReference] = useState("")
    const [description , setDescription]= useState("");
    const [price , setPrice] = useState("");
    const [photo , setPhoto] = useState(null);
    const [quantity , setQuantity] = useState("");
    const [category_id , setCategory_id] = useState("");
    const [sousCategory_id , setSousCategory_id] = useState("");
     
     
    //fonction callback de cloudinary déclenché lors de l'envoi un fichier
	const checkUploadResult = (resultEvent) => {
	    setMsg(null)
	    setError(null)
	    //si l'envoi est réussit
        if (resultEvent.event === "success") {
            console.log("RESULT", resultEvent);

	        console.log("result info", resultEvent.info);
	        
	        let datas = {
	           photo: resultEvent.info.public_id,
	        }
	        setPhoto(resultEvent.info.public_id)
        }
        	
    }
    
	//fonction d'affichage de notre interface de chargement d'images/videos de cloudinary
	const showWidget = () => {
	    //paramètrage de l'interface
	    const widget = window.cloudinary.createUploadWidget(
	      {
	        cloudName: "dapuyno3v",//nom de mon cloud
	        uploadPreset: "basket",//dossier ou l'on veut envoyer
	        maxImageWidth: 800,//on peut paramètrer la taille max de l'image
	        cropping: true,//recadrage
	      },
	      (error, result) => {
	        checkUploadResult(result);//appel de notre callback
	      }
	    );
	    //ouverture de notre interface
	    widget.open();
	}
	
	
	
    // on envoie le formulaire
    const onSubmitForm = ()=>{
        if(name === "" || reference === "" || description === "" || price === "" || quantity === "" || category_id === "" || sousCategory_id === "") {
		    setError("Tous les champs ne sont pas encore remplis !");
		}else{   
  
            let datas = {
                name:name,
                reference:reference,
                description:description,
                price:price,
                photo:photo,
                quantity:quantity,
                category_id:category_id,
                sous_category_id:sousCategory_id,
    
               }
            //appel de fonction de sauvegarde
            saveOneProduct(datas)
            .then((response)=>{
                if(response.status === 200){
                    console.log(response)
                     getAllProduct()
                    .then((response)=>{
                        let myProducts = response.result
                        myProducts.token=localStorage.getItem("token")
                        dispatch(setProduct(myProducts))
                        setMsg("Enregistrement effectué")
                        console.log("enregistrer!!")
                        setRedirect(true)
                        })
                        .catch((err)=>{
                            setError(err.message);
                        })
                   } else{
                        setError("Echec enregistrement du produit") 
                }
            })
            .catch((err)=>{
                console.log("echec d'enregistrement")
            })
        }
    }
	        
  
    if(redirect) {
	   return <Navigate to="/admin"/>
	}
	    
	return (
	    <div className="formulaire-mobile">
	        <h2 className="titre">Ajouter un produit</h2>
	        <Link className="retour" to="/admin"><i className="fa fa-arrow-circle-left"></i></Link>
	        
	        {msg !== null && <p className="msg">{msg}</p>}
	        
	        <form 
	            className="form formProduct" 
	            onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitForm()
                }}>
                
                {photo !== null && <CloudinaryContext cloudName="dapuyno3v">
    		        <div>
    	              <Image publicId={photo} className="ImgEdit">
    	                <Transformation quality="auto" fetchFormat="auto" />
    	              </Image>
    	            </div>
		         </CloudinaryContext>}
	            
	            <button
    	            onClick={(e) => {
    	              e.preventDefault();
    	              showWidget();
    	            }}
    	        >
	               Ajouter photo
	            </button>
            
            
                <input type="text"
                    maxLength="100"
                    placeholder="Nom du produit"
                    onChange={(e)=>{
                        setName(e.currentTarget.value);
                    }} 
                />
                
                 <input type="number"
                    maxLength="8"
                    placeholder="Reference"
                    onChange={(e)=>{
                        setReference(e.currentTarget.value);
                    }} 
                />
               
                <textarea 
    				placeholder="Description"
    				onChange={(e)=>{
    				    setDescription(e.currentTarget.value);
    				}}
    			/>
      
                <input type="number"
                    maxLength="6"
                    placeholder="Quantity"
                    onChange={(e)=>{
                        setQuantity(e.currentTarget.value);
                        
                    }} 
                />  
                
                <input type="text"
                    placeholder="Prix"
                    onChange={(e)=>{
                        setPrice(e.currentTarget.value);
                        
                    }} 
                />  
                
                <select
                    placeholder="Category"
                    onChange={(e)=>{
                        setCategory_id(e.currentTarget.value)
                }}>
                    <option></option>
                    <option value="1">homme</option>
                    <option value="2">femme</option>
                    <option value="3">enfant</option>
                </select>
                
               
                <select
                    onChange={(e)=>{
                        setSousCategory_id(e.currentTarget.value)
                }}>
                    <option></option>
                    <option value=" ">NULL</option>
                    <option value="1">fille</option>
                    <option value="2">garçon</option>
                </select>
                
                
	            <input type="submit" placeholder="Envoyer" />
               
	            {error !== null && <p className="msgError">{error}</p>}
            </form>
        </div>) 
      
}

export default AddProduct;
