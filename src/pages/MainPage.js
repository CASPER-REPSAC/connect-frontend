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

          <RecentBox
            noTap
            title="Currently Running"
            firstSectionCards={cards.filter((card) => card.currentState === 1)}
          />
          <RecentBox
            noTap
            title="Planned"
            firstSectionCards={cards.filter((card) => card.currentState === 0)}
          />
          <RecentBox
            noTap
            title="Ended"
            firstSectionCards={cards.filter((card) => card.currentState === 2)}
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
