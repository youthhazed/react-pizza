import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice.js';
import Categories from '../components/Categories.tsx';
import Sort from '../components/Sort.tsx';
import PizzaBlock from '../components/PizzaBlock/index.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import Pagination from '../components/Pagination/index.jsx';
import { SearchContext } from '../App.tsx';
import { fetchPizzas } from '../redux/slices/pizzaSlice.js';

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { cards: pizzaItems, status } = useSelector((state) => state.pizza);
  const { searchValue } = React.useContext(SearchContext);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const pizzas = pizzaItems
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
    const getPizzas = async () => {
      dispatch(
        fetchPizzas({
          sortType,
          categoryId,
        }),
      );
    };

    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' ? (
        <div>
          <h2>Ошибка загрузки данных</h2>
          <p>К сожалению, не удалось загрузить пиццы. Попробуйте позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination />
    </div>
  );
};

export default Home;
