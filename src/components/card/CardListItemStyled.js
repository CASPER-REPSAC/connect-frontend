import styled, { css } from 'styled-components';

const currentColors = {
  text: '#27242C',
  bbackGround: '#ebe9ef',
  unActiveCard: '#f4f4f4',
  stroke: '#E0E0E0',
  background: '#FFFFFF',
  shadow: '#cfcfcf10',
  unActiveButton: '#F3F3F3',
  unActiveButtonText: '#AFAFB4',
};

const {
  text,
  unActiveCard,
  stroke,
  background,
  shadow,
  unActiveButton,
  unActiveButtonText,
} = currentColors;

export const CardItemBlock = styled.div`
  border: solid 1px ${stroke};
  font-size: 14px;
  color: ${text};
  border-radius: 0.8rem;
  padding: 0.7rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 10rem;
  width: 20rem;
  background: ${background};
  box-shadow: 0px 10px 10px 6px ${shadow};
  * {
    overflow: hidden;
  }
  ${(props) =>
    props.sinWidth &&
    css`
      width: ${props.sinWidth}rem;
    `}
  ${(read) =>
    read === true &&
    css`
      background: ${unActiveCard};
    `}

    &+& {
    margin-left: 10px;
  }
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ArticleBlock = styled.div`
  display: flex;
  margin-bottom: 5px;
  .introduce {
    font-size: 12px;
    font-weight: normal;
  }
`;

export const AuthIcon = styled.div`
  flex: none;
  height: 3.4rem;
  width: 3.4rem;
  background: lightgray;
  margin: 8px 12px 5px 0px;
  border-radius: 0.8rem;
`;

export const Article = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
export const ArticleHeader = styled.div`
  background: white;
  display: flex;
  justify-content: space-between;
  .title {
    margin-top: 8px;
  }
  .Read {
    font-size: 8px;
    margin-left: 3px;
    color: ${unActiveButtonText};
    align: center;
    display: inline-block;
  }
  .typeAuth {
    font-size: 12px;
    font-weight: bold;
    text-align: right;
    margin-right: 3px;
    .author {
      font-size: 8px;
      font-weight: normal;
    }
  }
`;

export const Participants = styled.div`
  display: flex;
  .participant {
    width: 1.7rem;
    height: 1.7rem;
    background: lightgray;
    border-radius: 0.3rem;
  }
  .participant + .participant {
    margin-left: 0.2rem;
  }
`;

export const Tags = styled.div`
  display: flex;
`;
