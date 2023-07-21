import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface UseBannerProps {
  isBannerVisible: boolean;
  setIsBannerVisible: Dispatch<SetStateAction<boolean>>;
}
export const useBanner = (): UseBannerProps => {
  const [isBannerVisible, setIsBannerVisible] = useState(
    typeof window !== 'undefined' && window.localStorage.getItem('isBannerVisible') !== 'false',
  );

  useEffect(() => {
    window.localStorage.setItem('isBannerVisible', isBannerVisible.toString());
  }, [isBannerVisible]);

  return {
    isBannerVisible,
    setIsBannerVisible,
  };
};
