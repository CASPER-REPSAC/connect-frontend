import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useLoadings = () => {
  const [loadings, setLoadings] = useState({});
  // const dispatch = useDispatch();
  const loadingsRedux = useSelector((state) => state.loadings);

  const removeLoading = (loadingKey) => {
    const tmp = { ...loadings };
    delete tmp[loadingKey];
    setLoadings(tmp);
  };

  useEffect(() => {
    if (loadingsRedux) {
      const keys = Object.keys(loadingsRedux);
      const tmp = {};
      keys.map((key) => {
        if (loadingsRedux[key]) {
          tmp[key] = loadingsRedux[key];
        }
      });
      setLoadings(tmp);
    }
  }, [loadingsRedux]);

  return { loadings, removeLoading };
};
