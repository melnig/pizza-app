import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setsortType] = React.useState({
    name: "popular",
    sortProperty: "rating",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchValue
          ? `&search=${encodeURIComponent(searchValue)}`
          : "";
        const sort = sortType.sortProperty;

        const url = `https://685a49519f6ef9611155b072.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}${search}`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        setItems([]); // або покажи повідомлення користувачу
      } finally {
        setIsLoading(false);
      }
      window.scrollTo(0, 0);
    };

    fetchData();
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

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
        <Sort value={sortType} onChangeSort={(i) => setsortType(i)} />
      </div>

      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
