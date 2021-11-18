import React,{useEffect, useState} from 'react';

import { getCardsByTag, getTagInfo } from "../modules/api";

import  CardList from "../components/card/CardList";
import {BigTag} from "../components/common/Tag";


const ShowTagInfo = ({tagInfo}) =>{
  console.log('tagInfo',tagInfo);
  const {id, name, url} = tagInfo
  return (
    <>
      <BigTag tagId={id} tagName={name} />
    </>
  )
}

const TagPage = ({match}) => {
  const [cards, setCards] = useState();
  const [tagInfo, setTagInfo] = useState();
  const {tagId} = match.params;
  useEffect(() => {
    getCardsByTag(tagId, setCards);
  }, [match])
  console.log(match);

  useEffect(() => {
    getTagInfo(tagId, setTagInfo);
  }, [match])
  
  return (<>
    {tagInfo &&
      <ShowTagInfo tagInfo={tagInfo} />
    }
    {cards &&
      <CardList nowrap={true} cards={cards} />
    }
  </>
  );
};

export default TagPage;
