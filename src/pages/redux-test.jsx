import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCollectionRequestName,
  setCollectionRequestSymbol,
  // ... import other action creators
  collectionRequest,
  // ... import other async thunks
} from '../features/launchpadSlice';

const ReduxTest = () => {
  const dispatch = useDispatch();
  const {
    collectionRequestName,
    collectionRequestSymbol,
    // ... other state properties
    loading,
    error,
  } = useSelector((state) => state.launchpad);

  useEffect(() => {
    // Your useEffect logic here
  }, []);

  const handleCollectionRequestForm = async (event) => {
    event.preventDefault();
    dispatch(collectionRequest({
      name: collectionRequestName,
      symbol: collectionRequestSymbol,
      // ... other properties
    }));
  };

  // ... other handler functions

  return (
    <div>
      {/* Your JSX here */}
      <form onSubmit={handleCollectionRequestForm}>
        <input
          value={collectionRequestName}
          onChange={(e) => dispatch(setCollectionRequestName(e.target.value))}
        />
    
    <p>Collection Request Symbol</p>
    <input
        value={collectionRequestSymbol}
        onChange={(e) => dispatch(setCollectionRequestSymbol(e.target.value))}
        />
        
{/* ... value */}
<span>{collectionRequestSymbol}</span>
<br />
<span>{collectionRequestName}</span>



        <button type="submit" disabled={loading}>Submit</button>
      </form>
      {error && <p>Error: {error}</p>}
      {/* ... rest of your component JSX */}
    </div>
  );
};

export default ReduxTest;