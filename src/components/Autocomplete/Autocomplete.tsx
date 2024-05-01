import { ChangeEvent, useState } from 'react';

import { alphaNumericRegex } from '../../constants/validation';
import InputField from '../InputField';
import useProductSearch from './hooks/useProductSearch';
import useKeyboardActions from './hooks/useKeyboardActions';
import useInputBlur from './hooks/useInputBlur';
import useDebounce from '../../hooks/useDebounce';
import { highlightMatches } from './autocomplete.helpers';

import './autocomplete.css';

const Autocomplete = () => {
  const [searchValue, setSetsearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue);
  const { products, error, isLoading } = useProductSearch(debouncedSearchValue);
  const { isInputFocussed, onInputFocus, onInputBlur, listRef, inputRef } =
    useInputBlur();

  const { onKeyDown, activeItem } = useKeyboardActions({
    listRef,
    listLength: products.length,
    products,
    setSetsearchValue,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!alphaNumericRegex.test(value)) return;
    setSetsearchValue(value);
  };

  const onProductSelect = (productName: string) => {
    setSetsearchValue(productName);
    onInputBlur();
  };

  const shouldShowProducts = !isLoading && isInputFocussed;

  return (
    <div>
      <InputField
        type='text'
        label='Search Product'
        placeholder='Search any product..'
        onChange={handleInputChange}
        value={searchValue}
        handleFocus={onInputFocus}
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
      {isLoading && isInputFocussed && (
        <p className='products-loader'>Fetching Products....</p>
      )}
      {shouldShowProducts && (
        <div>
          {!products.length && <p> No Products found </p>}
          <ul className='product-list' ref={listRef}>
            {products.map((product, index) => (
              <li
                className={`product-item ${
                  index === activeItem ? 'active-item' : ''
                }`}
                key={product.id}
                onClick={() => onProductSelect(product.title)}
                dangerouslySetInnerHTML={{
                  __html: highlightMatches(product.title, debouncedSearchValue),
                }}
              ></li>
            ))}
          </ul>
          {error && <p className='products-error'> {error} </p>}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
