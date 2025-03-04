import { act } from "react-dom/test-utils";
import { db } from "../../data/db";
import { CartItem, Guitar } from "../../types";

export type CartActions = 
{type: 'add-to-cart', payload:{item: Guitar}}|
{type: 'remove-from-cart', payload: {item: Guitar['id']}}|
{type: 'decrease-quantity', payload:{item: Guitar['id']} } |
{type: 'increase-quantity', payload:{item: Guitar['id']} } |
{type: 'clear-cart'} 


export type CartState = {
    cart: CartItem[],
    data: Guitar[]
}

export const initialState : CartState = {
    data: db,
    cart: []
}


export const cartReducer = (
        state: CartState = initialState,
        action: CartActions
    )=>{

        if(action.type === 'add-to-cart'){
            //aca va la logica


            return{
                ...state
            }
        }

        if (action.type === 'increase-quantity'){

            return{
                ...state
            }
        }

        if (action.type === 'decrease-quantity'){

            return{
                ...state
            }
        }

        if (action.type === 'remove-from-cart'){


            return{
                ...state
            }
        }

        if (action.type === 'clear-cart'){

            return{
                ...state
            }
        }

        return state
    }



/*
Para crear un reducer:
1. Definimos las acciones -> export type ...Actions {type:'action', payload:{parameter : parameterType}}

2. Definir el State Inicial --> vemos cuantos states tenemos. En este caso hay 2 cart y data. En el proyecto de calorias teniamos 3 states : activities, activeId y editing. Necesitamos crear el type de los 'states' del reducer ANTES de crear la funcion initialState, por que? porque esa funcion initialState es del tipo (type) 'states' creado anteriormente. 

3. Definimos la funcion reducer --> es la funcin que UNE state y acciones. export const myReducer = ()=> {} la funcion recibe 2 parametros : state y action. state es de tipo CartState que definimos como paso intermedio y la inicializamos a initialState y action es de tipo CartAction. Esto nos ayuda a tener el autocompletado de Ts. Como nos ayuda? pues cuando empezamos a definir la actiones es 
if (action.type ===''aca Ts nos muestra las acciones disponibles)

Nota: los types los declaramos con pascalCase primer letra Mayuscula

*/