import { captureException } from '@sentry/react-native';
import { useCallback } from 'react';
import { InteractionManager } from 'react-native';
import { useDispatch } from 'react-redux';
import { explorerInit } from '~/redux/reducers/explorer';
import { uniqueTokensRefreshState } from '~/redux/reducers/uniqueTokens';
import {
  uniswapGetAllExchanges,
  uniswapPairsInit,
} from '~/redux/reducers/uniswap';
import logger from '~/utils/logger';

export default function useInitializeAccountData() {
  const dispatch = useDispatch();

  const initializeAccountData = useCallback(async () => {
    try {
      InteractionManager.runAfterInteractions(() => {
        logger.sentry('Initialize account data');
        dispatch(explorerInit());
      });

      InteractionManager.runAfterInteractions(async () => {
        logger.sentry('Initialize uniswapPairsInit & getAllExchanges');
        dispatch(uniswapPairsInit());
        await dispatch(uniswapGetAllExchanges());
      });

      InteractionManager.runAfterInteractions(async () => {
        logger.sentry('Initialize uniqueTokens');
        await dispatch(uniqueTokensRefreshState());
      });
    } catch (error) {
      logger.sentry('Error initializing account data');
      captureException(error);
    }
  }, [dispatch]);

  return initializeAccountData;
}
