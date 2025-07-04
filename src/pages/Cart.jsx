import React from "react";

import { Link } from "react-router";
import { useSelector } from "react-redux";

import CartNotEmpty from "../components/CartNotEmpty";
import CartEmpty from "../components/CartEmpty";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  console.log(items);
  return (
    <div className="container container--cart">
      {items.length > 0 ? <CartNotEmpty /> : <CartEmpty />}
    </div>
  );
};

export default Cart;
