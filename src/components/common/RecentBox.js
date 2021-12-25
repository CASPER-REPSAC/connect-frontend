import React, { useState } from 'react';
import '../../styles/RecentBox.scss';
import CardList from '../card/CardList';
import { NoCards } from './NoCards';

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

const RecentBox = ({
  firstSectionCards,
  secondSectionCards,
  noTap,
  title,
  titleColor,
}) => {
  const menus = ['내가 쓴글', '최신글'];
  const [selected, setSelected] = useState(menus[0]);

  return (
    <div className="recent-box">
      {!noTap ? (
        <div className="selector-box">
          <div className="selector">
            {menus.map((v, index) => (
              <SelectorItem
                key={index}
                selectorName={v}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
          {/* <div className="tip">
          tip - shift+wheel scroll으로 가로 스크롤 할 수 있습니다.
        </div> */}
        </div>
      ) : (
        <div className="notap-box" style={{ background: titleColor }}>
          {title}
        </div>
      )}
      <div className="content horizontal-scroll">
        {console.log(selected)}
        {!noTap ? (
          <>
            {selected === menus[0] ? (
              <>
                {firstSectionCards ? (
                  <CardList cards={firstSectionCards} />
                ) : (
                  <NoCards />
                )}
              </>
            ) : (
              <>
                {secondSectionCards ? (
                  <CardList cards={secondSectionCards} />
                ) : (
                  <NoCards />
                )}
              </>
            )}
          </>
        ) : (
          <CardList cards={firstSectionCards} />
        )}
      </div>
    </div>
  );
};

const BoxWithTitle = (title, titleColor, children) => {
  return (
    <div className="recent-box">
      <div className="notap-box" style={{ background: titleColor }}>
        {title}
      </div>
      <div className="content horizontal-scroll">{children}</div>
    </div>
  );
};

export { BoxWithTitle, RecentBox };
export default React.memo(RecentBox);
