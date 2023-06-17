

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Asociacion() {
    const [animals, setAnimals] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);

    const [animalUpdate, setAnimalUpdate] = useState(false);

    const [pageNumber, setPageNumber] = useState(1)
    const pageSize = 8

    const token = localStorage.getItem("token");

    const fetchAnimal = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/animal?page=${pageNumber}&size=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setAnimals(data);
        console.log(data);
    };


    const deleteAnimal = async (animal) => {
        const confirmDelete = window.confirm("¿Estás seguro de eliminar este animal?");

        if (confirmDelete) {
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/animal/" + animal.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al eliminar el animal");
                }

                const data = await response.json();
                console.log(data);
                fetchAnimal();
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 3000);
                setAnimalUpdate(true);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchAnimal();
    }, [pageNumber, animalUpdate]);

    return (
        <>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    Animal eliminado correctamente
                </div>
            )}
            <div>
                <h1>Recuperando todos los animales de la Asociación que hizo login</h1>
                <Link to="/animalForm">
                    <button className="btn btn-primary">Añadir animal</button>
                </Link>
                <div className="row">
                    {animals !== null && animals.length > 0 ? (
                        animals.map((animal) => {
                            return (
                                <div className="col" key={animal.id}>
                                    <div className="card" style={{ width: " 18rem" }}>
                                        <h2>{animal.nombre}</h2>
                                        <img src={animal.image_url} alt={animal.nombre} />
                                        <ul>
                                            <li>Animal: {animal.tipo_animal}</li>
                                            <li>Raza: {animal.raza}</li>
                                            <li>Edad: {animal.edad}</li>
                                            <li>Género: {animal.genero}</li>
                                            <li>Descripción: {animal.descripcion}</li>
                                        </ul>
                                        <Link to={`animalData${animal.id}`}>
                                            <button className="btn btn-primary">Editar</button>
                                        </Link>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteAnimal(animal)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <h1>No hay animales</h1>
                    )}
                </div>
            </div>
            <div>
                <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>Anterior</button>
                <button onClick={() => setPageNumber(pageNumber + 1)} disabled={animals !== null && animals.length < pageSize}>Siguiente</button>
            </div>
        </>
    )
}





// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// export default function Asociacion() {
//     const [animals, setAnimals] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(false);

//     const [animalUpdate, setAnimalUpdate] = useState(false);

//     const [pageNumber, setPageNumber] = useState(1);
//     const pageSize = 8;

//     const token = localStorage.getItem("token");

//     const fetchAnimal = async () => {
//         const response = await fetch(
//             `${process.env.BACKEND_URL}/api/animal?page=${pageNumber}&size=${pageSize}`,
//             {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );
//         const data = await response.json();
//         setAnimals(data);
//         console.log(data);
//     };

//     const deleteAnimal = async (animal) => {
//         const confirmDelete = window.confirm("¿Estás seguro de eliminar este animal?");

//         if (confirmDelete) {
//             try {
//                 const response = await fetch(
//                     process.env.BACKEND_URL + "/api/animal/" + animal.id,
//                     {
//                         method: "DELETE",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 if (!response.ok) {
//                     throw new Error("Error al eliminar el animal");
//                 }

//                 const data = await response.json();
//                 console.log(data);
//                 fetchAnimal();
//                 setSuccessMessage(true);
//                 setTimeout(() => {
//                     setSuccessMessage(false);
//                 }, 3000);
//                 setAnimalUpdate(true);
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     };

//     useEffect(() => {
//         fetchAnimal();
//     }, [pageNumber, animalUpdate]);

//     return (
//         <>
//             {successMessage && (
//                 <div className="alert alert-success" role="alert">
//                     Animal eliminado correctamente
//                 </div>
//             )}
//             <div>
//                 <h1>Recuperando todos los animales de la Asociación que hizo login</h1>
//                 <Link to="/animalForm">
//                     <button className="btn btn-primary">Añadir animal</button>
//                 </Link>
                // <div className="row">
                //     {animals !== null && animals.length > 0 ? (
                //         animals.map((animal) => {
                //             return (
                                // <div className="col" key={animal.id}>
                                //     <div className="card" style={{ width: " 18rem" }}>
                                //         <h2>{animal.nombre}</h2>
                                //         <img src={animal.image_url} alt={animal.nombre} />
                                //         <ul>
                                //             <li>Animal: {animal.tipo_animal}</li>
                                //             <li>Raza: {animal.raza}</li>
                                //             <li>Edad: {animal.edad}</li>
                                //             <li>Género: {animal.genero}</li>
                                //             <li>Descripción: {animal.descripcion}</li>
                                //         </ul>
                                //         <Link to={`animalData${animal.id}`}>
                                //             <button className="btn btn-primary">Editar</button>
                                //         </Link>
                                //         <button
                                //             className="btn btn-danger"
                                //             onClick={() => deleteAnimal(animal)}
                                //         >
                                //             Eliminar
                                //         </button>
                                //     </div>
                                // </div>
//                             );
//                         })
//                     ) : (
//                         <h1>No hay animales</h1>
//                     )}
//                 </div>
//             </div>
//             <div>
//                 <button
//                     onClick={() => setPageNumber(pageNumber - 1)}
//                     disabled={pageNumber === 1}
//                 >
//                     Anterior
//                 </button>
//                 <button
//                     onClick={() => setPageNumber(pageNumber + 1)}
//                     disabled={animals !== null && animals.length < pageSize}
//                 >
//                     Siguiente
//                 </button>
//             </div>
//         </>
//     );
// }


