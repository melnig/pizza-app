import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortId, setSortId] = React.useState({
    name: "popular",
    sortProperty: "rating",
  });

  console.log(categoryId, sortId);

  React.useEffect(() => {
    setIsLoading(true);
    const categoryParam = categoryId > 0 ? `category=${categoryId}` : "";
    const sortProperty = sortId.sortProperty.replace("-", "");

    const url = `https://685a49519f6ef9611155b072.mockapi.io/items?${categoryParam}&sortBy=${sortProperty}`;
    fetch(url)
      .then((res) => {
        const data = res.json();

        return data;
      })
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortId]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
      </div>
      <div className="content-title__block">
        <h2 className="content__title">All pizza</h2>
        <Sort value={sortId} onChangeSort={(i) => setSortId(i)} />
      </div>

      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default Home;
