import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '@ui';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients, 'data-cy': dataCy }, ref) => {
  const bun = useSelector(
    (state) => state.burgerConstructor.constructorBurger.bun
  );
  const items = useSelector(
    (state) => state.burgerConstructor.constructorBurger.ingredients
  );

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};
    items.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [bun, items]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
      data-cy={dataCy}
    />
  );
});
