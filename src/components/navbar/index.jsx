import { NavLink } from "react-router-dom";
import useCartStore from "../../store/storeCart";

export default function Navbar() {
  const count = useCartStore((state) => state.getCartCount());
  return (
    <div className="flex gap-2 fixed w-[50%] justify-between pr-2">
      <NavLink className="hover:underline" to="/">
        SCUTIGERA
      </NavLink>
      <NavLink className="hover:underline" to="/cart">
        CART({count})
      </NavLink>
    </div>
  );
}
