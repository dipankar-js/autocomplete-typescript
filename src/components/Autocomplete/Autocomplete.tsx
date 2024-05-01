import { ChangeEvent, useState } from 'react';

import InputField from '../InputField';
import useProductSearch from './hooks/useProductSearch';
import useInputBlur from './hooks/useInputBlur';

import './autocomplete.css';

const Autocomplete = () => {
  const [searchValue, setSetsearchValue] = useState<string>('');
  const { products, error, isLoading } = useProductSearch(searchValue);
  const { isInputFocussed, onInputFocus, onInputBlur, listRef, inputRef } =
    useInputBlur();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSetsearchValue(event.target.value);
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
        ref={inputRef}
      />
      {isLoading && isInputFocussed && (
        <p className='products-loader'>Fetching Products....</p>
      )}
      {shouldShowProducts && (
        <div>
          {!products.length && <p> No Products found </p>}
          <ul className='product-list' ref={listRef}>
            {products.map((product) => (
              <li
                className='product-item'
                key={product.id}
                onClick={() => onProductSelect(product.title)}
              >
                {product.title}
              </li>
            ))}
          </ul>
          {error && <p className='products-error'> {error} </p>}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
