import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchUserOrders } from '../../services/orders-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((store) => store.userOrders.orders);
  const { items: ingredients } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch, ingredients.length]);

  return <ProfileOrdersUI orders={orders} />;
};
