

// // // Card para la vista de usuario

import React, { useContext } from "react";
import { Context } from "../store/appContext";

export default function Card({ animal }) {
    const { store, actions } = useContext(Context);

    const handleColor = () => {
        if (store.darkMode) {
            return "dark-card"
        } else {
            return "light-card"
        }
    }

    return (
        <div className={handleColor()}>
            <h2>Nombre: {animal.nombre}</h2>
            <h3>Nombre de la Asociación: {animal.asociacion_nombre}</h3>
            <img src={animal.image_url} alt={animal.nombre} />
            <ul>
                <li>Raza: {animal.raza}</li>
                <li>Edad: {animal.edad}</li>
                <li>Género: {animal.genero}</li>
                <li>Provincia: {animal.asociacion_provincia}</li>
                <li>Descripción: {animal.descripcion}</li>
            </ul>
            <button onClick={()=>{
                actions.selectId(animal);
                actions.addFavorite()
            }}>Adoptar</button>
        </div>
    );
}

