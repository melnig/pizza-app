import React from "react";

export default function Categories({ value, onChangeCategory }) {
  const categories = ["All", "Meat", "Vegan", "Grill", "Hot", "Closed"];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
