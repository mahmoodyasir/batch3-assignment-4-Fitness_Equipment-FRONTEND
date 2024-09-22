import { useEffect } from "react";
import { useAppSelector } from "../../Redux/app/hooks";

const CartAlert = () => {
  const cartState = useAppSelector((state) => state.cartState);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (Object.keys(cartState).length > 0) {
 
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
    
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartState]);

  return null;
};

export default CartAlert;
