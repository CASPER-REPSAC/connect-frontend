import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RecentBox from '../components/common/RecentBox';
import CardList from '../components/card/CardList';
import { getActivityList, getUserActivityList } from '../modules/api';
import { useSelector } from 'react-redux';
import { NoCards } from '../components/common/NoCards';

// import '../styles/MainPage.scss';

const MainPage = () => {
  const { user } = useSelector((state) => ({ user: state.auth.user }));

  const [cards, setCards] = useState();
  const [userActiCards, setUserActiCards] = useState();
  useEffect(() => {
    getActivityList(setCards);
  }, []);

  useEffect(() => {
    if (user.pk) {
      getUserActivityList(user.pk, setUserActiCards);
    }
  }, [user]);

  return (
    <div className="main-page">
      {cards && cards[0] ? (
        <>
          {userActiCards && (
            <RecentBox
              firstSectionCards={userActiCards}
              secondSectionCards={cards}
            />
          )}

          <br />
          <h3>Currently Running</h3>
          <CardList
            n={true}
            cards={cards.filter((card) => card.currentState === 1)}
          />
          <br />
          <h3>Planned</h3>
          <CardList
            n={true}
            cards={cards.filter((card) => card.currentState === 0)}
          />
          <br />
          <h3>Ended</h3>
          <CardList
            n={true}
            cards={cards.filter((card) => card.currentState === 2)}
          />
        </>
      ) : (
        <>
          <NoCards />
        </>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    // cards: state.activities.activities,
  }),
  {},
)(MainPage);
