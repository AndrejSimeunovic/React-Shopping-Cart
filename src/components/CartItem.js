import { useContext } from "react";
import { Button, Stack } from "react-bootstrap";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

export default function CartItem(props) {
  const { removeFromCart } = useContext(ShoppingCartContext);
  const item = storeItems.find((item) => item.id === props.id) || null;
  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="d-flex align-items-center">
        <img
          src={item.imgUrl}
          style={{ height: "75px", width: "125px", objectFit: "cover" }}
        />
        <div className="ms-2">
          <div>
            <span className="me-1">{item.name}</span>
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{props.quantity}
            </span>
          </div>
          <span className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.price)}
          </span>
        </div>
      </div>
      <div>
        <span className="me-2">
          {formatCurrency(item.price * props.quantity)}
        </span>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          &times;
        </Button>
      </div>
    </Stack>
  );
}
