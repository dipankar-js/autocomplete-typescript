import { ChangeEvent, useState } from 'react';

import InputField from '../InputField';
import useProductSearch from './hooks/useProductSearch';

import './autocomplete.css';

const Autocomplete = () => {
  const [searchValue, setSetsearchValue] = useState<string>('');
  const [isInputFocussed, setIsInputFocussed] = useState<boolean>(false);

  const { products, error, isLoading } = useProductSearch(searchValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSetsearchValue(event.target.value);
  };

  const onProductSelect = (productName: string) => {
    setSetsearchValue(productName);
    setIsInputFocussed(false);
  };

  const handleFocus = () => {
    setIsInputFocussed(true);
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
        handleFocus={handleFocus}
      />
      {isLoading && isInputFocussed && (
        <p className='products-loader'>Fetching Products....</p>
      )}
      {shouldShowProducts && (
        <>
          <ul className='product-list'>
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
        </>
      )}
    </div>
  );
};

export default Autocomplete;
