import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryValue } from "../redux/slices/filterSlice";

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.sort.sortProperty);

  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (index) => {
    dispatch(setCategoryValue(index));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchValue
          ? `&search=${encodeURIComponent(searchValue)}`
          : "";
        const sort = sortType;

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
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
      </div>
      <div className="content-title__block">
        <h2 className="content__title">All pizza</h2>
        <Sort />
      </div>

      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
