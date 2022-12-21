import { useContext } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

export default function ShoppingCart(props) {
  const { closeCart, cartItems } = useContext(ShoppingCartContext);
  return (
    <Offcanvas show={props.isOpen} onHide={closeCart} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            return (
              <div key={item.id}>
                <CartItem {...item} />
              </div>
            );
          })}
          <div className="d-flex align-items-center justify-content-end fw-bold fs-5">
            <span>
              Total:{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((it) => cartItem.id === it.id);
                  return total + item.price * cartItem.quantity;
                }, 0)
              )}
            </span>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
