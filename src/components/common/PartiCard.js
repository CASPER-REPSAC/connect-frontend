import React from 'react';
import '../../styles/Write.scss';
import { Link } from 'react-router-dom';

export const PartiCard = (props) => {
  return (
    <div
      {...props}
      className="participant-card active w-100"
      style={{ fontSize: '12px' }}
    >
      <>{props.children}</>
    </div>
  );
};

export const PartiIcon = (props) => {
  return (
    <img
      src={props.img}
      alt={`participant icon : ${props.partiName}`}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '7px',
        margin: '1.5px',
      }}
    />
  );
};
export const UserIcon = (props) => {
  return (
    <div className="userIcon tooltip-container">
      <img
        src={
          props.img ||
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAB4CAYAAAA9kebvAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARfSURBVHgB7Z3NddNAFIWvgQLCjh2iAkIFERXEVGB3gDuwOnCowOnAoQKJChwqsKnALNkN8yIJHMc/iS3P37vfOTdSJOecmbl5b0YaydODOzKr3Opjs3+5dlwDS6vfje4b/Wy2UXNhNbSaWq2sDLVV0jYzq0HTZtGQW01Ac4/VFP+zXZDkViXiatSQVTZtGgzy3yeFiqHxYpSk9Qwekf6kQFyNFrMKeCCzmiPOBotZCziM7iE40PIpafsRzkwBwFBBqMCZKAAYKm2zCwCGStvsAoCh0jZ7BMBQUWiAPfT2nMtQX0JFdf9VMTJZ8gn15MkT9hm9gJ6ZpVSQmbDPqE1/xOsdf1BY9UFi453VH6sfmye2RXSGOppJvEgKfzTP/WrLhyYgsXPQwxxxjTSp3cqxhzKQQlKnq8Qa6320zCvPQVJCRuCV7Kz30V9BUuO63WkjWm6KrEBSQ66nP8i2jWheM6eJBPBDVLdGX4OkSi4/2tQtaZv3tNNE0vdbiWgZbdPkdBFv37dGk7TJ36B+Fyo4jDHogl6vBx8EVv5LRrQOMjGa/XP6XNJoJUgH0E1n0jHso2u6Kv8rEBXQaCXQaCXQaCXQaCXQaCXQaCXQaCXQaCXQaCXQaCXQaCXQaCUEO3tFuoURrQQarQQarQQarQQarQQarQQarQQavYfhcIjBYIBUCP27OLwoyzKzWCzMarV62I+p7DsUVWGdqSxL0yL7MZUdNPp5Go1GZhM5FlMdaPQBSZreRgIpPKrCnl3SL+9iPp9HVRcavUNFUZhDjMfjqOpEoze0K2VvI8/zqOpGoxtdXFzsTdmbyGflbyKq44JGW93c3JiXMplMYqrjXL3R/X7fHEtEKbxUbXR79+tYIkrhE9VGT6dTcyqz2SyGug7UGm0nLExX2ImP0Ot7qdLoU1P2JoHfNXv41mY+7ps+d1ZfOB+dPmI0I1oBb7H2xewkTW7RrGrHiE6bfwudMaLTpcLaanaM6HTJsbZGJSM6TWSk/WghUkZ0msgSSMv1A4zo9CiwZbFwRnRaLFFH8xMY0ekg18ufd52k0elQYEvKbqHRaVBYfTv0oVCn16jnaYxnEkuFqBNMBuC9sJQDkwHAd4Gpl0meGBnghbwBiQmZpPiCPaPrXXDUHQ8F6uvkJY4klpSlVSU6Wj80lgprNPgKHcE+OizkNuYttkwzngqN9o+YK8ZWVt+b3zvHl9HtIy6y0m0GHSyb7X2zL9vK6hcc4brvWYA4x8flVQXiBdcRfQXiBaZtBbhO3RWIF1wbfQfiBdcPBz688AXiHJcRXYEme8Ol0bcgXnE14s5AvOLC5BLEK65SN0fbnnFldKdTbuQ4eDdMAS4immk7AMToJc4LjQ6EGZi2k0ciusL5qECCQR7nOVdEX4EExRRM2yrIUL/T06XRGUiQDNGdyWOQoBGDaLIShqj712NM/goSFRleNkAr0dGLYOQ89A6cz6yurfrNftYclydF2jcNRJy0CJy/uL3bDYx16MMAAAAASUVORK5CYII='
        }
        alt={`author icon : ${props.userName}`}
        style={
          props.author
            ? {
                width: '50px',
                height: '50px',
                borderRadius: '8px',
                margin: '5px 8px 5px -5px',
              }
            : {
                width: '40px',
                height: '40px',
                borderRadius: '7px',
                margin: '1.5px',
              }
        }
      />
      {!props.noTooltip && (
        <span className="custom-tooltip">{props.userName}</span>
      )}
      {props.leader && <span className="leader-tooltip"></span>}
    </div>
  );
};

export const LinkedCard = (props) => {
  return (
    <PartiCard {...props}>
      <Link to={props.link || 'main'}>
        <b>{props.children || 'title'}</b>
      </Link>
    </PartiCard>
  );
};

export const ChapterCard = (props) => {
  return (
    <PartiCard {...props}>
      <Link to={props.link || 'main'}>
        <b>{props.children || 'title'}</b>
      </Link>
    </PartiCard>
  );
};
