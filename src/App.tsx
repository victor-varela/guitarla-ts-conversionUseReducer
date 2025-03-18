import { useReducer } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { useCart } from "./hooks/useCart";
import { cartReducer, initialState } from "./hooks/reducers/use-cart-reducer";

function App() {
  const {clearCart } = useCart();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <>
      <Header
        cart={state.cart}
        clearCart={clearCart}
        dispatch = {dispatch}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map(guitar => (
            <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  );
}

export default App;

/*
Se importa el hook useReducer de react, destructuring como arreglo de state y dispatch y se pasan los parametros al Hook (cartReducer, initialState)

Vamos reemplazando la funcionalidad del custom hook hacia el reducer: 
    Primero en el template (vista de la app) cuando renderizamos por medio de db--- nos valemos del reducer
    Pasamos el dispatch al componente que lo va a necesitar para 'disparar' la acciones, en este caso el componente Guitar

*/
