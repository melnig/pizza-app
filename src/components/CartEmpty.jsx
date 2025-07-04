import React from "react";
import { Link } from "react-router";
import img from "../assets/img/empty_cart-512.svg";

export default function CartEmpty() {
  return (
    <div class="content">
      <div class="container container--cart">
        <div class="cart cart--empty">
          <h2>
            Cart is empty <icon>😕</icon>
          </h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src={img} alt="Empty cart" />
          <Link to="/" class="button button--back">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
