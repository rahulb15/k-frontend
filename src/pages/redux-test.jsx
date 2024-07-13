// src/components/LaunchpadComponent.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCollectionRequestMutation } from 'src/services/launchpad.service';
import {
  setCollectionRequestName,
  setCollectionRequestSymbol,
  setCollectionRequestCreator,
  setLastRequestResult,
  // ... other action imports
} from 'src/features/launchpadSlice';

function LaunchpadComponent() {
  const dispatch = useDispatch();
  const {
    collectionRequestName,
    collectionRequestSymbol,
    collectionRequestCreator,
    lastRequestResult,
    // ... other state fields
  } = useSelector(state => state.launchpad);

  const [collectionRequest, { isLoading, isError, error }] = useCollectionRequestMutation();

  const handleNameChange = (e) => {
    dispatch(setCollectionRequestName(e.target.value));
  };

  const handleSymbolChange = (e) => {
    dispatch(setCollectionRequestSymbol(e.target.value));
  };

  const handleCreatorChange = (e) => {
    dispatch(setCollectionRequestCreator(e.target.value));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await collectionRequest({
        collectionRequestName,
        collectionRequestSymbol,
        collectionRequestCreator,
        // ... other form data
      }).unwrap();
      dispatch(setLastRequestResult(result));
      // Handle success (e.g., show a success message)
    } catch (err) {
      dispatch(setLastRequestResult(err));
      // Handle error
    }
  };


  // const {
  //   collectionRequestName,
  //   collectionRequestSymbol,
  //   collectionRequestCreator,
  //   collectionRequestDescription,
  //   collectionRequestCategory,
  //   collectionRequestSupply,
  //   collectionRequestUriList,
  //   collectionRequestMintPrice,
  //   collectionRequestRoyalityPerc,
  //   collectionRequestCoverImgUrl,
  //   collectionRequestBannerImgUrl,
  //   collectionRequestStartDate,
  //   collectionRequesEndDate,
  //   collectionRequestEnableFreeMint,
  //   collectionRequestEnableWl,
  //   collectionRequestEnablePresale,
  //   collectionRequestEnableAirdrop,
  //   collectionRequestPolicy,
  //   wallet
  // } = args;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={collectionRequestName}
        onChange={handleNameChange}
        placeholder="Collection Name"
      />
      <input
        type="text"
        value={collectionRequestSymbol}
        onChange={handleSymbolChange}
        placeholder="Collection Symbol"
      />

      <input
        type="text"
        value={collectionRequestCreator}
        onChange={handleCreatorChange}
        placeholder="Collection Creator"
      />




      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Collection Request'}
      </button>
      {isError && <div>Error: {error.message}</div>}
      {lastRequestResult && (
        <div>
          Last Request Result: {JSON.stringify(lastRequestResult)}
        </div>
      )}
    </form>
  );
}

export default LaunchpadComponent;