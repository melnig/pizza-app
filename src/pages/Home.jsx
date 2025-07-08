import React from "react";
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
import { fetchData } from "../redux/slices/pizzasSlice";

const Home = () => {
  const { categoryId, sortOption, currentPage } = useSelector(
    (state) => state.filter
  );
  const { items, isLoading, status } = useSelector((state) => state.pizzas);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMounted = React.useRef(false);
  const isSearchParamsApplied = React.useRef(false);

  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (index) => {
    dispatch(setCategoryValue(index));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const loadPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue
      ? `&search=${encodeURIComponent(searchValue)}`
      : "";
    const sort = sortOption.sortProperty;

    dispatch(
      fetchData({
        currentPage,
        category,
        sort,
        search,
      })
    );

    window.scrollTo(0, 0);
  };

  // Читання параметрів з URL при першому рендері. Ініціалізація стану фільтрації на основі URL при завантаженні сторінки.
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

  // Запуск loadPizzas, якщо немає параметрів з URL. Завантаження даних на основі поточного стану, якщо не було URL-синхронізації.
  React.useEffect(() => {
    if (!isSearchParamsApplied.current) {
      loadPizzas();
    }
    isSearchParamsApplied.current = false;
  }, [categoryId, sortOption, searchValue, currentPage]);

  // Синхронізація стану з URL. Автоматична синхронізація фільтрів з URL при зміні стану, але не під час першого рендеру.
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
      {status === "error" && (
        <div className="content__error-info">
          <span>😕</span>
          <h2>Error loading pizzas</h2>
          <p>Please try again later.</p>
        </div>
      )}
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
