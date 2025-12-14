import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';

import {
  moveDown,
  moveUp,
  removeIngredient
} from '../../services/burger-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, 'data-cy': dataCy }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveDown(index));
    };

    const handleMoveUp = () => {
      dispatch(moveUp(index));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
        data-cy={dataCy}
      />
    );
  }
);
