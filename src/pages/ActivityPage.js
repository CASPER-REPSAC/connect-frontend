import React, { useState, useEffect } from 'react';
import CardList from '../components/card/CardList';
import { getListData } from '../modules/api';
import { Stack } from 'react-bootstrap';
// import { NoCards } from '../components/common/NoCards';

const OneBlock = ({ blockTitle, cards }) => {
  return (
    <div className="mb-4">
      <h4>{blockTitle}</h4>
      <CardList cards={cards} />
    </div>
  );
};

const ActivityPage = ({ match }) => {
  const [cards, setCards] = useState([1]);
  const [cardsByType, setCardsByType] = useState({
    Study: undefined,
    CTF: undefined,
    Project: undefined,
  });

  useEffect(() => {
    getListData('/api/activities/', setCards);
  }, []);

  useEffect(() => {
    setCardsByType({
      Study: cards
        .filter((v) => v['type'] === 'Study')
        .filter((v, index) => index < 5),
      Project: cards
        .filter((v) => v['type'] === 'Project')
        .filter((v, index) => index < 5),
      CTF: cards
        .filter((v) => v['type'] === 'CTF')
        .filter((v, index) => index < 5),
    });
  }, [cards]);

  if (match.params.type) {
    const { type } = match.params;
    return (
      <>
        <OneBlock blockTitle={type} cards={cardsByType[type]} />
      </>
    );
  }
  return (
    <Stack gap={3}>
      <>
        <OneBlock blockTitle="CTF" cards={cardsByType.CTF} />
        <OneBlock blockTitle="Project" cards={cardsByType.Project} />
        <OneBlock blockTitle="Study" cards={cardsByType.Study} />
      </>
    </Stack>
  );
};

export default React.memo(ActivityPage);
