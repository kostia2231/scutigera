import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RestoreScrollWrapper({ children }) {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);
  return children;
}
