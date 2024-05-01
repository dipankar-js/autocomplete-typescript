import { useEffect, useState } from 'react';

import { Product } from '../../../types/Product';
import { API_ENDPOINTS } from '../../../constants/endpoints';

const fetchProducts = async (
  searchValue: string,
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${API_ENDPOINTS.FETCH_PRODUCT}?q=${searchValue}`
    );
    const data = await response.json();
    const products = data.products.map((item: Product) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
    }));
    setProducts(products);
  } catch (error) {
    setError('Failed to fetch products');
  } finally {
    setIsLoading(false);
  }
};

const useProductSearch = (searchValue: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts(searchValue, setProducts, setIsLoading, setError);
  }, [searchValue]);

  return {
    products,
    error,
    isLoading,
  };
};

export default useProductSearch;
