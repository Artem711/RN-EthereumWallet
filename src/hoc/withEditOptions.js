import { connect } from 'react-redux';
import {
  pushSelectedCoin,
  removeSelectedCoin,
  setHiddenCoins,
  setIsCoinListEdited,
  setPinnedCoins,
} from '~/redux/reducers/editOptions';

export default Component =>
  connect(() => ({}), {
    pushSelectedCoin,
    removeSelectedCoin,
    setHiddenCoins,
    setIsCoinListEdited,
    setPinnedCoins,
  })(Component);
