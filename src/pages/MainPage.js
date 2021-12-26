import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RecentBox from 'components/common/RecentBox';
import { getActivityList, getUserActivityList } from 'modules/api';
import { useSelector } from 'react-redux';
import { NoCards } from 'components/common/NoCards';
import { RoundBadge } from 'components/common/RoundBadge';
import { Link } from 'react-router-dom';

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
            title="Running"
            titleColor="#28A745"
            firstSectionCards={cards.filter((card) => card.currentState === 1)}
            maxHeight="352px"
          />
          <RecentBox
            noTap
            title="Planned"
            titleColor="#0a7fad"
            firstSectionCards={cards.filter((card) => card.currentState === 0)}
            maxHeight="352px"
          />
          <RoundBadge>
            <Link to={`/types/Ended`}>Ended</Link>
          </RoundBadge>
          {/* <RecentBox
            noTap
            titleColor="#56656b"
            title="Ended"
            firstSectionCards={cards.filter((card) => card.currentState === 2)}
            display="block"
          /> */}
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
