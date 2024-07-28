import "./App.css";
import { useRef } from "react";
import { animated, useTrail } from "react-spring";

function App() {
  const items = ["A", "N", "V", "I", "L"];

  const [trail, api] = useTrail(items.length, () => ({
    rotateX: 0,
  }));

  const isFlipped = useRef(false);

  const handleClick = () => {
    if (isFlipped.current) {
      api.start({
        rotateX: 0,
      });
      isFlipped.current = false;
    } else {
      api.start({
        rotateX: 180,
      });
      isFlipped.current = true;
    }
  };
  return (
    <div className="App">
      <div className="container" onClick={handleClick}>
        {trail.map(({ rotateX }, index) => (
          <div className="box" key={index}>
            <animated.div
              className="front-box"
              style={{
                transform: rotateX.to(
                  (val) => `perspective(600px) rotateX(${val}deg)`
                ),
                transformStyle: "preserve-3d",
              }}
            >
              {items[index]}
            </animated.div>
            <animated.div
              className="back-box"
              style={{
                transform: rotateX.to(
                  (val) => `perspective(600px) rotateX(${180 - val}deg)`
                ),
                transformStyle: "preserve-3d",
              }}
            >
              {items[index]}
            </animated.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
