import React, { useState } from 'react';
import '../../styles/RecentBox.scss';
import CardList from '../card/CardList';
import casGray from '../../img/casOutlineDark-40.png';

const SelectorItem = ({ selectorName, selected, setSelected }) => {
  return (
    <span
      className={
        selectorName === selected
          ? 'selector-item active'
          : 'selector-item inactive'
      }
      onClick={() => {
        setSelected(selectorName);
      }}
    >
      {selectorName}
    </span>
  );
};

const RecentBox = ({ cards }) => {
  const menus = ['내가 쓴 글', '최신글'];
  const [selected, setSelected] = useState(menus[0]);

  return (
    <div className="recent-box">
      <div className="selector-box">
        <div className="selector">
          {menus.map((v) => (
            <SelectorItem
              selectorName={v}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
        <div className="tip">
          tip - shift+wheel scroll으로 가로 스크롤 할 수 있습니다.
        </div>
      </div>
      <div className="content horizontal-scroll">
        {cards ? (
          <CardList cards={cards} />
        ) : (
          <div className="no-card">
            <img src={casGray} alt="cas logo" />
            <span>현재 보여줄 수 있는 카드가 없네요..</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(RecentBox);
