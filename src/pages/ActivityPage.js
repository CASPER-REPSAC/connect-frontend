import React, { useState, useEffect } from 'react';
import CardList from '../components/card/CardList';
import { getListData } from '../modules/api';
import { Stack } from 'react-bootstrap';
import { NoCards } from '../components/common/NoCards';

const ActivityPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getListData('/api/activities/', setCards);
  }, []);

  return (
    <Stack gap={3}>
      {cards && cards[0] ? (
        <>
          <div>
            <h3>CTF</h3>
            <CardList
              cards={cards
                .filter((v) => v['type'] === 'CTF')
                .filter((v, index) => index < 5)}
            />
          </div>
          <div>
            <h3>Study</h3>
            <CardList
              cards={cards
                .filter((v) => v['type'] === 'Study')
                .filter((v, index) => index < 5)}
            />
          </div>
          <div>
            <h3>Project</h3>
            <CardList
              cards={cards
                .filter((v) => v['type'] === 'Project')
                .filter((v, index) => index < 5)}
            />
          </div>
        </>
      ) : (
        <NoCards />
      )}
    </Stack>
  );
};

export default React.memo(ActivityPage);
