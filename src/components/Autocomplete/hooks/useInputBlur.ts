import { useRef, useEffect, useState } from 'react';

const useInputBlur = () => {
  const [isInputFocussed, setIsInputFocussed] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputFocus = () => {
    setIsInputFocussed(true);
  };

  const onInputBlur = () => {
    setIsInputFocussed(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !listRef.current?.contains(event.target as Node) &&
      event.target !== inputRef.current
    ) {
      setIsInputFocussed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { isInputFocussed, onInputFocus, onInputBlur, listRef, inputRef };
};

export default useInputBlur;
