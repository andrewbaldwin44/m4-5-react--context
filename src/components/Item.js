import React, { createRef, useEffect } from "react";
import styled from "styled-components";

function Item({ id, name, cost, value, clicker, cookieCount, setCookieCount,
                purchasedItems, setPurchasedItems }) {

  const amountPurchased = purchasedItems[id];
  const focusItem = createRef();

  const handleClick = (id) => {
    if (cookieCount >= cost) {
      setPurchasedItems({
        ...purchasedItems,
        [id]: purchasedItems[id] + 1
      });

      setCookieCount(cookieCount - cost);
    }
  }

  useEffect(() => {
    if (id === 'cursor') {
      focusItem.current.focus();
    }
  }, []);

  return (
    <Wrapper ref={focusItem} onClick={() => handleClick(id)}>
      <Left>
        <Name>{name}</Name>
        <Info>
          Cost: {cost} cookie{cost > 1 ? 's' : ''}.
          Produces {value} cookie{value > 1 ? 's' : ''}
          {''} / {clicker ? 'click' : 'second'}.
        </Info>
      </Left>
      <Right>{amountPurchased}</Right>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  border-bottom: 1px solid #444;
  color: #fff;
  text-align: left;
  padding: 15px 0;
`;

const Left = styled.div`
  flex: 1;
`;

const Name = styled.h4`
  font-size: 22px;
`;

const Info = styled.div`
  color: #ccc;
  font-size: 15px;
`;

const Right = styled.div`
  font-size: 32px;
  padding: 0 20px;
`;

export default Item;
