import { useEffect, useState } from 'react';

const useDebounce = (userInput: string, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(userInput);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(userInput);
    }, delay);

    return () => clearTimeout(timeout);
  }, [userInput, delay]);

  return debouncedValue;
};

export default useDebounce;
