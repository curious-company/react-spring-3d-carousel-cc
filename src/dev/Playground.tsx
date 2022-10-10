import React, { Component } from "react";
import Carousel from "../components/Carousel";
import uuidv4 from "uuid";
import { config } from "react-spring";

export default class Example extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle,
    goToSlideDelay: 200,
  };

  slides: Slide[] = [
    {
      key: uuidv4(),
      content: (
        <img
          src="http://127.0.0.1:1337/uploads/nutperfect_120x184mm_Macadamia_Mafo_copy_fa4d045921.png"
          width="514px"
          height="655px"
          alt="1"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <img
          src="http://127.0.0.1:1337/uploads/nutperfect_120x184mm_Haselnuss_Mafo_copy_0ab5a17c8a.png"
          width="514px"
          height="655px"
          alt="2"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <img
          src="http://127.0.0.1:1337/uploads/nutperfect_120x184mm_Mandel_ungeschaelt_Mafo_copy_4414af8af0.png"
          width="514px"
          height="655px"
          alt="1"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <img
          src="http://127.0.0.1:1337/uploads/nutperfect_120x184mm_Mix3_Mafo_copy_d593fcc4b9.png"
          width="514px"
          height="655px"
          alt="2"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <img
          src="http://127.0.0.1:1337/uploads/nutperfect_120x184mm_Cashewbruch_Mafo_copy_8ef92d4124.png"
          width="514px"
          height="655px"
          alt="3"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <img
          src="http://127.0.0.1:1337/uploads/nutperfect_120x184mm_Cashewbruch_Mafo_copy_8ef92d4124.png"
          width="514px"
          height="655px"
          alt="4"
        />
      ),
    },
  ].map((slide, index) => {
    return { ...slide, onClick: () => this.setState({ goToSlide: index }) };
  });

  onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0,
    });
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "40.9375rem",
          background: "#04433D",
          zIndex: 0,
        }}
      >
        <Carousel
          slides={this.slides}
          goToSlide={this.state.goToSlide}
          goToSlideDelay={this.state.goToSlideDelay}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
        <div
          style={{
            margin: "0 auto",
            marginTop: "2rem",
            width: "50%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <label>Go to slide: </label>
            <input name="goToSlide" onChange={this.onChangeInput} />
          </div>
          <div>
            <label>Go to slide delay: </label>
            <input name="goToSlideDelay" onChange={this.onChangeInput} />
          </div>
          <div>
            <label>Offset Radius: </label>
            <input name="offsetRadius" onChange={this.onChangeInput} />
          </div>
          <div>
            <label>Show navigation: </label>
            <input
              type="checkbox"
              checked={this.state.showNavigation}
              name="showNavigation"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ showNavigation: e.target.checked });
              }}
            />
          </div>
          <div>
            <button
              onClick={(e: React.MouseEvent) => {
                this.setState({ config: config.gentle });
              }}
              disabled={this.state.config === config.gentle}
            >
              Gentle Transition
            </button>
          </div>
          <div>
            <button
              onClick={(e: React.MouseEvent) => {
                this.setState({ config: config.slow });
              }}
              disabled={this.state.config === config.slow}
            >
              Slow Transition
            </button>
          </div>
          <div>
            <button
              onClick={(e: React.MouseEvent) => {
                this.setState({ config: config.wobbly });
              }}
              disabled={this.state.config === config.wobbly}
            >
              Wobbly Transition
            </button>
          </div>
          <div>
            <button
              onClick={(e: React.MouseEvent) => {
                this.setState({ config: config.stiff });
              }}
              disabled={this.state.config === config.stiff}
            >
              Stiff Transition
            </button>
          </div>
        </div>
      </div>
    );
  }
}
