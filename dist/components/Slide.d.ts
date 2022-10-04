/// <reference types="react" />
interface IProps {
    content: JSX.Element;
    onClick?: () => void;
    offsetRadius: number;
    index: number;
    animationConfig: object;
    slidesTotal: number;
}
export default function Slide({ content, offsetRadius, index, animationConfig, onClick, slidesTotal }: IProps): JSX.Element;
export {};
