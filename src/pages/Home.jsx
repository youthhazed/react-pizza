import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const pizzas = items
    .filter((item) => {
      if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((obj) => (
      <PizzaBlock
        key={obj.id}
        id={obj.id}
        title={obj.title}
        price={obj.price}
        image={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
    ));
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://8cf9c36e94f750a8.mokky.dev/items?${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : pizzas}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
