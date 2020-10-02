import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CaratSelectorDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 15px;
  border: 0;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
`;

const CaratOptionSpan = styled.span`
  position: relative;
  display: inline-block;
`;

const CaratOptions = styled.input`
  margin: 0px 65px 0px 65px;
  &:checked ${CaratOptionSpan} {
    background-color: red;
  }
`;

const CaratLabel = styled.span`
  opacity: 0;
  position: absolute;
  left: 95px;
  transition: .5s;
  ${CaratOptionSpan}:hover & {
    opacity: 100;
  }
`;

const CaratSelector = (props) => {
  const [radioCarat, setRadioCarat] = useState(150);

  const clickHandler = {
    50: () => { setRadioCarat(50) },
    100: () => { setRadioCarat(100) },
    150: () => { setRadioCarat(150) },
    200: () => { setRadioCarat(200) }
  }

  useEffect(() => {
    props.set.setCarat(radioCarat);
  }, [radioCarat]);

  return (
    <CaratSelectorDiv>
      <form>
        <CaratOptionSpan>
          <CaratOptions type='radio' name='carat-option' onClick={clickHandler['50']}/>
          <CaratLabel>1/2</CaratLabel>
        </CaratOptionSpan>
        <CaratOptionSpan>
          <CaratOptions type='radio' name='carat-option' onClick={clickHandler['100']}/>
          <CaratLabel>1</CaratLabel>
        </CaratOptionSpan>
        <CaratOptionSpan>
          <CaratOptions type='radio' name='carat-option' onClick={clickHandler['150']}/>
          <CaratLabel>1 1/2</CaratLabel>
        </CaratOptionSpan>
        <CaratOptionSpan>
          <CaratOptions type='radio' name='carat-option' onClick={clickHandler['200']}/>
          <CaratLabel>2</CaratLabel>
        </CaratOptionSpan>
      </form>
    </CaratSelectorDiv>
  );
};

export default CaratSelector;