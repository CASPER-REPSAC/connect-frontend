import React, { useState, useEffect } from 'react';
import CardList from '../components/card/CardList';
import { getListData } from '../modules/api';
import axios from 'axios';
import { NoCards } from '../components/common/NoCards';

async function getActivity(url, setState) {
  const res = await axios.get(url);
  console.log('getListData', res['data']['results']);

  setState(res['data']['results']);
  return res[''];
}
const ActivityPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getActivity('/api/', setCards);
  }, []);

  return (
    <div>
      {cards[0] ? (
        <>
          <h3>CTF</h3>
          <CardList cards={cards.filter((v) => v['type'] === 'CTF')} />
          <h3>Study</h3>
          <CardList cards={cards.filter((v) => v['type'] === 'Study')} />
          <h3>Project</h3>
          <CardList cards={cards.filter((v) => v['type'] === 'Project')} />
        </>
      ) : (
        <NoCards />
      )}
    </div>
  );
};

export default React.memo(ActivityPage);
