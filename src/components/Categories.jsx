import React from "react";

export default function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ["All", "Meat", "Vegan", "Grill", "Hot", "Closed"];

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
