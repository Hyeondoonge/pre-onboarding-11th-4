import { useEffect, useRef, useState } from 'react';

export default function useFloating() {
  const [isFloating, setIsFloating] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const handleWindowClick = () => {
      setIsFloating(false);
    };

    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return { isFloating, setIsFloating, targetRef };
}
