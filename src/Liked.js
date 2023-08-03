import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { LikeContext } from './LikeContext';


const Liked = () => {
    const { isLiked, setIsLiked } = useContext(LikeContext);
    const {isDisliked,setisDisliked}=useContext(LikeContext);
    const handleLikeClick = () => {
      setIsLiked(!isLiked);
    };
    const handleDikeClick = () => {
        setisDisliked(!isDisliked);
      };

  return (
    <div className="buttons-container">
              <button className="button hover:bg-gray-800" onClick={handleLikeClick}
        style={{ color: isLiked ? 'cyan' : 'white' }}>
                <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <button className="button hover:bg-gray-800" onClick={handleDikeClick}
                style={{ color: isDisliked ? 'cyan' : 'white' }}>
                  <FontAwesomeIcon icon={faThumbsDown} />
                  </button>
    </div>
  );
};

export default Liked;



