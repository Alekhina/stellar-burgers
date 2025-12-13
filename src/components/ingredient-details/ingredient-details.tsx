import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { setCurrentIngredient } from '../../services/ingredients-slice';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const ingredients: TIngredient[] = useSelector(
    (store) => store.ingredients.items
  );
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  useEffect(() => {
    if (id && ingredients.length > 0) {
      const ingredient = ingredients.find((item) => item._id === id);
      if (ingredient) {
        dispatch(setCurrentIngredient(ingredient));
      }
    }
  }, [id, ingredients, dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
