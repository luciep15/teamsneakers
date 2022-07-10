import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {updateOneProduct , changeImg , getAllProduct} from '../../../api/product';
import { useParams } from "react-router";
import {Link} from 'react-router-dom';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, setProduct } from "../../../slices/productSlice";

const EditProduct = (props)=>{
    
     const params = useParams();
     const product = useSelector(selectProduct)
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

     useEffect(()=>{
        let id = params.id
        const index = product.findIndex(e=>e.id === parseInt(id));
        console.log("index", id)
        if(index !== -1){
                //on met à jour nos states pour les champs de formulaire
            setName(product[index].name);
            setReference(product[index].reference);
            setDescription(product[index].description);
            setPrice(product[index].price);
            setPhoto(product[index].photo);
            setQuantity(product[index].quantity);
            setCategory_id(product[index].category_id)
            setSousCategory_id(product[index].sous_category_id)
        }else{
             console.log("pas d'index trouvé")
        }  
          
    	}, [product , params.id])
    	
    //fonction callback de cloudinary déclenché lors de l'envoi un fichier
	const checkUploadResult = (resultEvent) => {
	    setMsg(null)
	    //si l'envoi est réussit
        if (resultEvent.event === "success") {
            console.log("RESULT", resultEvent);

	        console.log("result info", resultEvent.info);
	        
	        let datas = {
	           photo: resultEvent.info.public_id,
               id:params.id,   
	        }
	        
	       changeImg(datas)
	        .then((res)=>{
	            if(res.status === 200){
	                 getAllProduct()
	                .then((response)=>{
	                 let myProduct = response.result
	                 myProduct.token=localStorage.getItem("token")
	                 dispatch(setProduct(myProduct))  
	                 setPhoto(response.result.photo)
	                })
	                 setMsg('Votre image a bien été édité');
	            }else{
	                setError("L'image n'a pas été modifié");
	            }
	        })
	        .catch(err=>console.log("Echec modification image!"))
	        console.log(datas)
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
            let datas = {
                name:name,
                reference:reference,
                description:description,
                price:price,
                quantity:quantity,
                category_id : category_id,
                sous_category_id: sousCategory_id
                
               }
            //appel de fonction de sauvegarde
            updateOneProduct(datas , params.id)
            .then((response)=>{
                if(response.status === 200){
                    getAllProduct()
                    .then((response)=>{
                        let myProducts = response.result
                        myProducts.token=localStorage.getItem("token")
                        dispatch(setProduct(myProducts))
                        setRedirect(true)
                        setMsg("Modification effectué")
                        console.log("modifié!!")
                        })
                        .catch((err)=>{
                            setError(err.message);
                        })
                   } else{
                        setError("Echec modification du produit") 
                    }
            })
            .catch((err)=>{
                console.log("echec modification")
            })
    }
       
    if(redirect) {
	   return <Navigate to="/admin"/>
	}
	    
	return (
	    <div className="formulaire-mobile">
	        <h2 className="titre">Modifier un produit</h2> 
	        <Link className="retour" to="/admin"><i className="fa fa-arrow-circle-left"></i></Link>
	        {msg !== null && <p className="msg">{msg}</p>}
	        {error !== null && <p className="msgError">{error}</p>}
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
	               Modifier la photo
	            </button>
	            
                <input type="text"
                    placeholder="Nom du produit"
                    defaultValue={name}
                    onChange={(e)=>{
                        setName(e.currentTarget.value);
                    }} 
                />
                
                 <input type="text"
                    placeholder="Reference"
                    defaultValue={reference}
                    onChange={(e)=>{
                        setReference(e.currentTarget.value);
                    }} 
                />
               
                <textarea 
    				placeholder=""
    				defaultValue={description}
    				onChange={(e)=>{
    				    setDescription(e.currentTarget.value);
    				}}
    			/>
      
                <input type="number"
                    placeholder="Quantity"
                    defaultValue={quantity}
                    onChange={(e)=>{
                        setQuantity(e.currentTarget.value);
                        
                    }} 
                />  
                
                <input type="text"
                    placeholder="Prix d'achat"
                    defaultValue={price}
                    onChange={(e)=>{
                        setPrice(e.currentTarget.value);
                    }} 
                /> 
                
                <select
                    value={category_id}
                    onChange={(e)=>{
                        setCategory_id(e.currentTarget.value)
                }}>
                    <option value="1">homme</option>
                    <option value="2">femme</option>
                    <option value="3">enfant</option>
                </select>
                
                <select
                    value={sousCategory_id}
                    onChange={(e)=>{
                        setSousCategory_id(e.currentTarget.value)
                }}>
                    <option value=" ">NULL</option>
                    <option value="1">fille</option>
                    <option value="2">garçon</option>
                </select>
                
                
                <input type="submit" placeholder="Envoyer" />
            </form>
        </div>)
}

export default EditProduct;
