// src/hooks/useCollectionTypeFunctions.js

import { useCallback } from 'react';
import {
  useCheckPublicMutation,
  useCheckPublicPriceMutation,
  useReserveTokensMutation,
} from "../services/launchpad.service";
import {
  useCheckMarketPublicMutation,
  useCheckMarketPublicPriceMutation,
  useMarketReserveTokensMutation,
} from "../services/marketplace.service";

export const useCollectionTypeFunctions = (collectionType) => {
  const [checkPublic] = useCheckPublicMutation();
  const [checkPublicPrice] = useCheckPublicPriceMutation();
  const [reserveTokens] = useReserveTokensMutation();

  const [checkMarketPublic] = useCheckMarketPublicMutation();
  const [checkMarketPublicPrice] = useCheckMarketPublicPriceMutation();
  const [marketReserveTokens] = useMarketReserveTokensMutation();

  const checkIsPublic = useCallback(async (colName) => {
    if (collectionType === 'marketplace') {
      return checkMarketPublic({ colName });
    } else {
      return checkPublic({ colName });
    }
  }, [collectionType, checkMarketPublic, checkPublic]);

  const checkPrice = useCallback(async (colName) => {
    if (collectionType === 'marketplace') {
      return checkMarketPublicPrice({ colName });
    } else {
      return checkPublicPrice({ colName });
    }
  }, [collectionType, checkMarketPublicPrice, checkPublicPrice]);

  const reserveTokensFunction = useCallback(async (args) => {
    if (collectionType === 'marketplace') {
      return marketReserveTokens(args);
    } else {
      return reserveTokens(args);
    }
  }, [collectionType, marketReserveTokens, reserveTokens]);

  return {
    checkIsPublic,
    checkPrice,
    reserveTokensFunction
  };
};