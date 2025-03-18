import { db } from "../../data/db";
import { CartItem, Guitar } from "../../types";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "remove-from-cart"; payload: { item: Guitar["id"] } }
  | { type: "decrease-quantity"; payload: { item: Guitar["id"] } }
  | { type: "increase-quantity"; payload: { item: Guitar["id"] } }
  | { type: "clear-cart" };

export type CartState = {
  cart: CartItem[];
  data: Guitar[];
};

export const initialState: CartState = {
  data: db,
  cart: [],
};

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

export const cartReducer = (state: CartState = initialState, action: CartActions) => {
  if (action.type === "add-to-cart") {
    const { id: itemId } = action.payload.item;
    //aca va la logica
    const itemExists = state.cart.find(guitar => guitar.id === itemId);
    console.log(itemExists);

    let updatedCart: CartItem[] = [];
    if (itemExists) {
      // existe en el carrito
      updatedCart = state.cart.map(item => {
        if (item.id === action.payload.item.id && item.quantity < MAX_ITEMS) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "increase-quantity") {
    const cart = state.cart.map(item => {
      if (item.id === action.payload.item && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart,
    };
  }

  if (action.type === "decrease-quantity") {
    const updatedCart = state.cart.map(item => {
      if (item.id === action.payload.item && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "remove-from-cart") {
    const { item } = action.payload;
    const cart = state.cart.filter(guitar => guitar.id !== item);
    return {
      ...state,
      cart,
    };
  }

  if (action.type === "clear-cart") {
    return {
      ...state,
      cart: []
    };
  }

  return state;
};

/*
Para crear un reducer:
1. Definimos las acciones -> export type ...Actions {type:'action', payload:{parameter : parameterType}}

2. Definir el State Inicial --> vemos cuantos states tenemos. En este caso hay 2 cart y data. En el proyecto de calorias teniamos 3 states : activities, activeId y editing. Necesitamos crear el type de los 'states' del reducer ANTES de crear la funcion initialState, por que? porque esa funcion initialState es del tipo (type) 'states' creado anteriormente. 

3. Definimos la funcion reducer --> es la funcin que UNE state y acciones. export const myReducer = ()=> {} la funcion recibe 2 parametros : state y action. state es de tipo CartState que definimos como paso intermedio y la inicializamos a initialState y action es de tipo CartAction. Esto nos ayuda a tener el autocompletado de Ts. Como nos ayuda? pues cuando empezamos a definir la actiones es 
if (action.type ===''aca Ts nos muestra las acciones disponibles)

Nota: los types los declaramos con PascalCase primer letra Mayuscula

La LOGICA: la logica en las actions tiene una estructura, siempre hay que retornar 

 if (action.type === "some-action") {
  
  aca va la logica
  
      **nota: const {item} = action.payload --> se lee asi: de action.payload voy a extraer item

    return {
      ...state, --> siempre por default para que react note el cambio y renderice el componente. Se usa el spread para copiar el estado anterior y evitar modificarlo directamente. Luego a esta estructura basica que difinimos cuando vamos haciendo el reducer le agregamos la logica a medida que llegamos a ese punto en el codigo
    };
  }

  Usamos la propiedad cart que habiamos definido como el estado y eso es lo que vamos a actualizar a medida que ejecutamos las acciones del reudcer. NOs valemos de una let o const (segun sea el caso) updatedCart para asignarle ese valor a cart



*/
