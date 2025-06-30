import React from "react";

const categories = ["All", "Meat", "Vegan", "Grill", "Hot", "Closed"];

export default function Categories({ categoryId, onChangeCategory }) {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
