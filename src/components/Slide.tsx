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
    50 * (Math.abs(offsetFromCenter) / (offsetRadius + 9));
  let translateX = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateX = 0;
    } else if (index === totalPresentables - 1) {
      translateX = -100;
    }
  }

  if (offsetFromCenter === 1) {
    translateX += translateXoffset;
  } else if (offsetFromCenter === -1) {
    translateX -= translateXoffset;
  } else if (offsetFromCenter === 2) {
    translateX += translateXoffset * 5.5;
  } else if (offsetFromCenter === -2) {
    translateX -= translateXoffset * 5.5;
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

    counter = slidesToIgnoreFront + offsetRadius
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
