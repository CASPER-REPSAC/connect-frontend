import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/card/CardList';

const CardListContainer = (props) => {
  return <CardList {...props} />;
};

export default connect(
  (state) => ({ cards: state.cards.cards, tagColors: state.colors.tagColors }),
  {},
)(CardListContainer);
