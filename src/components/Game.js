import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";

import useInterval from "../hooks/use-interval.hook";
import useKeydown from '../hooks/useKeydown.hook';
import useDocumentTitle from '../hooks/useDocumentTitle.hook';
import { items } from '../data';
import { GameContext } from './GameContext';

const calculatePowerUps = (purchasedItems, clicker = false) => {
  return items.reduce((cookiesPerTick, item) => {
    if (item.clicker === clicker) {
      return cookiesPerTick += item.value * purchasedItems[item.id];
    } else return cookiesPerTick;
  }, 0);
};

function Game() {
  const { cookieCount, setCookieCount, purchasedItems } = useContext(GameContext);

  const incrementCookies = () => {
    const clickValue = calculatePowerUps(purchasedItems, true);
    const defaultValue = 1;
    const cookieCountIncrement = clickValue > 0 ? clickValue : defaultValue;

    setCookieCount(cookieCount + cookieCountIncrement);
  }

  useInterval(() => {
    const generatedCookies = calculatePowerUps(purchasedItems);

    setCookieCount(cookieCount + generatedCookies)
  }, 1000);

  useKeydown(() => setCookieCount(cookieCount + 1), 'Space');
  useDocumentTitle(`${cookieCount} cookies - Cookie Clicker`, `Cookie Clicker`);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{cookieCount} cookies</Total>
          <strong>{calculatePowerUps(purchasedItems)}</strong> cookies
          per second
        </Indicator>
        <Button onClick={incrementCookies}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              cost={item.cost}
              value={item.value}
              clicker={item.clicker}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  transform-origin: center center;

  &:active {
    transform: scale(0.9);
  }
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
