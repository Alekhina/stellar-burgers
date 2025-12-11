import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((store) => store.userOrders.orders);
  const user = useSelector((store) => store.auth.user);

  //TODO: useEffect?

  return <ProfileOrdersUI orders={orders} />;
};
