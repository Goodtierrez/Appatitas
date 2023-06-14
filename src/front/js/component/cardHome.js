// Card para la vista de los animales en la home, al hacer click en la card se redirige al componente animalHomeDetail

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export default function CardHome({ animal }) {
    const { store, actions } = useContext(Context);


    const handleColor = () => {
        if (store.darkMode) {
            return "dark-card"
        } else {
            return "light-card"
        }
    }
    const cardStyle = {
        maxWidth: "300px",
        maxHeight: "400px",
        fontSize: "1px",
        margin: "1px",
        padding: "0px",
        

    };

    const imageStyle = {
        maxWidth: "100%",
        maxHeight: "100%",
        marginBottom: "10px",
    };

    return (

        <Link to={`animalHome${animal.id}`} style={{ textDecoration: "none" }}>
            <div className={` border border-1 mt-4 rounded-3 shadow border-2`} style={cardStyle}>
                <img src={animal.image_url} alt={animal.nombre} style={imageStyle} />
                <h2 style={{ fontSize: "20px", textDecoration: "none" }}>Nombre: {animal.nombre}</h2>
                <p style={{ fontSize: "12px", textDecoration: "none" }}><i className="fa-solid fa-location-dot fa-lg fa-fw" />{animal.asociacion_provincia}</p>
            </div>
        </Link>

    );
}