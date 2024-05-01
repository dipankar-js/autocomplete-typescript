import { useState, KeyboardEvent, useCallback } from 'react';

import { KEYBOARD_ACTIONS } from '../../../constants/common';
import { Product } from '../../../types/Product';
const { ENTER, ARROW_DOWN, ARROW_UP } = KEYBOARD_ACTIONS;

interface useKeyboardActionsProps {
  listRef: React.RefObject<HTMLUListElement>;
  products: Product[];
  listLength: number;
  setSetsearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const useKeyboardActions = ({
  listRef,
  listLength,
  products,
  setSetsearchValue,
}: useKeyboardActionsProps) => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const container = listRef.current!;

  const onPressEnter = useCallback(() => {
    const currentProduct = products[activeItem];
    setSetsearchValue(currentProduct.title);
  }, [activeItem, products, setSetsearchValue]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case ENTER:
          onPressEnter();
          break;
        case ARROW_UP:
          if (activeItem > 0) {
            setActiveItem(activeItem - 1);
            container.scrollTop -= 35;
          }
          break;
        case ARROW_DOWN:
          if (activeItem < listLength - 1) {
            setActiveItem(activeItem + 1);
            container.scrollTop += 35;
          }
          break;
        default:
          break;
      }
    },
    [activeItem, container, listLength, onPressEnter]
  );

  return { onKeyDown, activeItem };
};

export default useKeyboardActions;
