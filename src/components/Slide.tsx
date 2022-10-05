import React from "react";
import styled from "@emotion/styled";
import { Spring } from "react-spring/renderprops";

const SlideContainer = styled.div`
  position: absolute;
  height: 100%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;

  img {
    object-fit: scale-down;
    display: block;
    max-height: 100%;
  }
`;

interface IProps {
  content: JSX.Element;
  onClick?: () => void;
  offsetRadius: number;
  index: number;
  animationConfig: object;
  slidesTotal: number
}

export default function Slide({
  content,
  offsetRadius,
  index,
  animationConfig,
  onClick,
  slidesTotal
}: IProps) {
  const offsetFromCenter = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 5));

  const translateXoffset =
    (5 * (Math.abs(offsetFromCenter) / (offsetRadius + 5)));
    console.log(translateXoffset)
  let translateX = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateX = 0;
    } else if (index === totalPresentables - 1) {
      translateX = -100;
    }
  }

  if (offsetFromCenter === 1) {
    translateX += -2;
  } else if (offsetFromCenter === -1) {
    translateX -= -2;
  } else if (offsetFromCenter === 2) {
    translateX += 35;
  } else if (offsetFromCenter === -2) {
    translateX -= 35;
  } 


  const getZIndex = () => {
    const indexesToThrow: number[] = []

    const notUsedSlides = slidesTotal - offsetRadius

    const slidesToIgnoreFront = Math.round(notUsedSlides / 2)
    const slidesToIgnoreBack = Math.round(notUsedSlides / 2)

    let counter = 0
    while (counter > slidesToIgnoreFront) {
      indexesToThrow.push(counter)
      
      counter++
    }

    counter = slidesToIgnoreFront + offsetRadius + 1
    while (counter < slidesTotal) {
      indexesToThrow.push(counter)
      
      counter++
    }

    if (indexesToThrow.includes(index)) {
      return -2
    } else {
      return Math.abs(Math.abs(offsetFromCenter) - 2)
    }
  }

  return (
    <Spring
      to={{
        transform: `translateY(-50%) translateX(${translateX}%) scale(${distanceFactor})`,
        left: `${
          offsetRadius === 0 ? 50 : 50 + (offsetFromCenter * 50) / offsetRadius
        }%`,
        //opacity: distanceFactor * distanceFactor
      }}
      config={animationConfig}
    >
      {style => (
        <SlideContainer
          style={{ ...style, zIndex: getZIndex() }}
          onClick={onClick}
        >
          {content}
        </SlideContainer>
      )}
    </Spring>
  );
}
