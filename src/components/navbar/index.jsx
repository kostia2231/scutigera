import { NavLink } from "react-router-dom";
import useCartStore from "../../store/storeCart";

export default function Navbar() {
  const count = useCartStore((state) => state.getCartCount());
  return (
    <div className="flex gap-2">
      <NavLink to="/">SCUTIGERA</NavLink>
      <NavLink to="/cart">CART({count})</NavLink>
    </div>
  );
}
