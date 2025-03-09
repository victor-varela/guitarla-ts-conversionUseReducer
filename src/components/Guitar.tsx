import type { Guitar } from '../types'
import { CartActions } from '../hooks/reducers/use-cart-reducer'

type GuitarProps = {
    guitar : Guitar, 
    dispatch: React.Dispatch<CartActions>
}

export default function Guitar({guitar, dispatch} : GuitarProps) {

    const { name, image, description, price } = guitar

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => dispatch({type:'add-to-cart', payload: {item: guitar}})} 
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}


/*
    entonces el dispatch es un objeto de 2 propiedades, type al cual le pasamos un valor explicito y payload el cual es un objeto con 1 propiedad item al cual le pasamos una variable?

ChatGPT Plus
Exactamente, el objeto que se pasa a dispatch tiene dos propiedades principales:

type → Es un string explícito que define el tipo de acción que se quiere ejecutar. En este caso, "add-to-cart".
payload → Es un objeto que contiene datos adicionales necesarios para procesar la acción.
En tu código, payload tiene una única propiedad:

item → Se le asigna el valor de la variable guitar.
*/