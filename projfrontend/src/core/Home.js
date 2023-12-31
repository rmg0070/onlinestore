import React , {useState,useEffect} from 'react'
import "../styles.css" 
import {API} from "../backend" ;
import Base from './Base';
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';
import { isAuthenticated } from "../auth/helper/index";

export default function Home() {
    
    useEffect(() => {
        loadAllProducts()
        
    }, []);

    const [products, setProducts] = useState([])
    const [error, setError] = useState("")

    const loadAllProducts = () => {
        getAllProducts().then((data) => {
            if(data.error){
                setError(data.error);
            }else{
                setProducts(data);
            }
        })
    }
    var displayName = ""
    if(isAuthenticated()) {
        const {user : {name } } = isAuthenticated()
        displayName = name
    }
     
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <Base
         title={ `Hello `+ (!displayName?`There!`:capitalizeFirstLetter(displayName)+`!`)}
         description="Best tshirts are available here"
        >
            <div className="d-flex justify-content-evenly text-dark flex-wrap">
                {products.map((product,index)=>{
                    return (
                        <div key={index} className="blocks"><Card product={product} addtocart={true}/></div>
                    );
                })}
               
            </div>
        </Base>
        
    );
}
    