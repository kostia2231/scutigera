import { NavLink } from "react-router-dom";
import useCartStore from "../../store/storeCart";

export default function Navbar() {
  const count = useCartStore((state) => state.getCartCount());
  return (
    <div className="flex gap-2 fixed w-[50%] justify-between pr-2 max-[640px]:w-[100%] max-[640px]:bg-white max-[640px]:px-4 max-[640px]:py-4 z-30">
      <NavLink
        className="underline-offset-2 hover:underline active:opacity-70 max-[640px]:hover:no-underline"
        to="/"
      >
        SCUTIGERA
      </NavLink>
      <NavLink
        className="underline-offset-2 hover:underline active:opacity-70 max-[640px]:hover:no-underline"
        to="/cart"
      >
        CART({count})
      </NavLink>
    </div>
  );
}
