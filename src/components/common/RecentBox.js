import React, { useState } from 'react';
import '../../styles/RecentBox.scss';
import CardList from '../card/CardList';
import { NoCards } from './NoCards';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
  maxHeight,
  display,
}) => {
  const menus = ['내가 작성한 액티비티', '최신 액티비티'];
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
          <Link to={`/types/${title}`}>
            {title} <FontAwesomeIcon icon={faChevronRight} className="icon" />
          </Link>
        </div>
      )}
      <div
        className="content horizontal-scroll"
        style={{ maxHeight: maxHeight, display: display }}
      >
        {!noTap ? (
          <>
            {selected === menus[0] ? (
              <>
                {firstSectionCards && firstSectionCards.length > 0 ? (
                  <CardList cards={firstSectionCards} />
                ) : (
                  <NoCards
                    margin="5px"
                    msg="액티비티를 작성하지 않은 것 같은데요?"
                  />
                )}
              </>
            ) : (
              <>
                {secondSectionCards && secondSectionCards.length > 0 ? (
                  <CardList cards={secondSectionCards} />
                ) : (
                  <NoCards margin="5px" />
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
