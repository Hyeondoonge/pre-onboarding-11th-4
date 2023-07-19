import { useEffect, useRef } from 'react';

function useDebounce() {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debounce = (callback: () => void, duration: number = 1500) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback();
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return debounce;
}

export default useDebounce;
