import React from "react";
import CartSVG from "./utils/Svg/CartSVG";

interface CarritoProps {
    setShowOrderCart: () => void;
}

const Carrito: React.FC<CarritoProps> = ({ setShowOrderCart }) => {
    return (
        <div className="icon-cart-container" onClick={setShowOrderCart}>
            <CartSVG />
        </div>
    );
}

export default Carrito;

