import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});



export function CartContextProvider({children}) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts,setCartProducts] = useState([]);


    useEffect(() => {
        const storedCart = ls && ls.getItem("cart");
        if (storedCart) {
            setCartProducts(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        if (ls && cartProducts.length > 0) {
            ls.setItem("cart", JSON.stringify(cartProducts));
        } else {
            ls.removeItem("cart"); 
        }
    }, [cartProducts]);



    function addProduct(productId) {
        setCartProducts(prev => [...prev,productId]);
    }
    function removeProduct(productId) {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((value,index) => index !== pos);
            }
            return prev;
        });
    }
    function clearCart() {
        setCartProducts([]);
        ls?.removeItem('cart');
    }

    return (
        <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
            {children}
        </CartContext.Provider>
    );
}