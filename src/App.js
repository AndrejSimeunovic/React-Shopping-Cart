import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { ShoppingCartContext } from "./context/ShoppingCartContext";
import ShoppingCart from "./components/ShoppingCart";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  //const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
  const [isOpen, setIsOpen] = useState(false);

  function getSumOfAllItems() {
    return cartItems.reduce((acc, item) => (acc = acc + item.quantity), 0);
  }

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseQuantity(id) {
    setCartItems((currCartItems) => {
      if (currCartItems.find((item) => item.id === id) == null) {
        return [...currCartItems, { id, quantity: 1 }];
      } else {
        return currCartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseQuantity(id) {
    setCartItems((currCartItems) => {
      if (currCartItems.find((item) => item.id === id)?.quantity === 1) {
        return currCartItems.filter((item) => item.id !== id);
      } else {
        return currCartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function openCart() {
    setIsOpen(true);
  }
  function closeCart() {
    setIsOpen(false);
  }
  function removeFromCart(id) {
    setCartItems((currCartItems) =>
      currCartItems.filter((item) => item.id !== id)
    );
  }

  return (
    <>
      <ShoppingCartContext.Provider
        value={{
          getItemQuantity,
          getSumOfAllItems,
          increaseQuantity,
          decreaseQuantity,
          openCart,
          closeCart,
          removeFromCart,
          cartItems,
        }}
      >
        <Navbar />
        <ShoppingCart isOpen={isOpen} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </ShoppingCartContext.Provider>
    </>
  );
}

export default App;
