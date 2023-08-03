import React, { createContext, useState } from 'react';

const LikeContext = createContext();

const LikeProvider = ({ children }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setisDisliked] = useState(false);
  const [iscopy,setiscopy]= useState(false);

  return (
    <LikeContext.Provider value={{ isLiked, setIsLiked ,isDisliked, setisDisliked, iscopy, setiscopy }}>
      {children}
    </LikeContext.Provider>
  );
};

export { LikeContext, LikeProvider };
