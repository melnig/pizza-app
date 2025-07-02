import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { sortItems } from "../components/Sort";
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryValue,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

const Home = () => {
  const { categoryId, sortOption, currentPage } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMounted = React.useRef(false);
  const isSearchParamsApplied = React.useRef(false);

  const { searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const onChangeCategory = (index) => {
    dispatch(setCategoryValue(index));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const search = searchValue
        ? `&search=${encodeURIComponent(searchValue)}`
        : "";
      const sort = sortOption.sortProperty;

      const url = `https://685a49519f6ef9611155b072.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}${search}`;

      const res = await axios.get(url);
      setItems(res.data);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setItems([]); // або покажи повідомлення користувачу
    } finally {
      setIsLoading(false);
    }
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search && !isSearchParamsApplied.current) {
      const params = qs.parse(window.location.search.substring(1));
      const sortOption = sortItems.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sortOption,
        })
      );
      isSearchParamsApplied.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearchParamsApplied.current) {
      fetchData();
    }
    isSearchParamsApplied.current = false;
  }, [categoryId, sortOption, searchValue, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortOption.sortProperty,
      categoryId,
      currentPage,
    });

    // Оновлюємо URL лише, якщо параметри змінилися
    if (window.location.search !== `?${queryString}` && isMounted.current) {
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortOption, currentPage, navigate]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(4)].map((_, index) => (
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
