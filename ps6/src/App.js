import './App.css';
import React, { useState } from 'react';
import { random } from 'lodash';

const correctRed = random(0, 255);
const correctGreen = random(0, 255);
const correctBlue = random(0, 255);

function colorsMatch(red, green, blue, correctRed, correctGreen, correctBlue) {
  red = parseInt(red);
  green = parseInt(green);
  blue = parseInt(blue);
 
  if ((red === correctRed) && (green === correctGreen) && (blue === correctBlue)) {
    let myguess = document.querySelector('#myguess');
    myguess.append('Congrats! You are Correct!');
  }
  else {
    let myguess = document.querySelector('#myguess');
    let wrong = 'Your guess: rgb(' + red + ','+ green + ','+ blue  + '). Actual: rgb(' + correctRed + ',' + correctGreen + ',' + correctBlue + ')';
    myguess.append(wrong);
  }
}

function App() {

  const [showDiv, setShowDiv] = useState(false);

  let [red, setRed] = useState(50);
  const [green, setGreen] = useState(50);
  const [blue, setBlue] = useState(50);

  const RedChange = (e) => {
    const value = e.target.value;
    setRed(value);
  };

  const GreenChange = (e) => {
    const value = e.target.value;
    setGreen(value);
  };

  const BlueChange = (e) => {
    const value = e.target.value;
    setBlue(value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center', justifyItems: 'center' }}>
      <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
      <h1> Guess the Color of the Rectangle </h1>
      <label id='cheating'>
        "Cheating Mode"
        <input type='checkbox' value='false' onClick={() => {setShowDiv(!showDiv);}}/>
      </label>
      <div>
        <div id='answer-box' style={{ margin: 5, borderRadius: 10, background: `rgba(${correctRed},${correctGreen},${correctBlue},0.5)`, minHeight: 200, width: 300 }}>
        </div> 
        <div id='cheat-box' style={{ margin: 5, borderRadius: 10, background: `rgba(${red},${green},${blue},0.5)`, minHeight: 200, width: 300, display: showDiv ? 'block' : 'none'}}>
        </div>     
      </div>

      <div id='color-picker'>
        <div className='row'>
          <span className="component-color-preview" style={{ backgroundColor: `rgba(255,0,0,0.5)` }}>Red</span>
          <input type="number" value={red} onChange={RedChange} />
          <input type="range" min={0} max={255} value={red} onChange={RedChange} />
        </div>
        <div className='row'>
          <span className="component-color-preview" style={{ backgroundColor: `rgba(0,255,0,0.5)` }}>Green</span>
          <input type="number" value={green} onChange={GreenChange} />
          <input type="range" min={0} max={255} value={green} onChange={GreenChange} />
        </div>
        <div className='row'>
          <span className="component-color-preview" style={{ backgroundColor: `rgba(0,0,255,0.5)` }}>Blue</span>
          <input type="number" value={blue} onChange={BlueChange} />
          <input type="range" min={0} max={255} value={blue} onChange={BlueChange} />
        </div>
        <button>
          <div onClick={() => { colorsMatch(red, green, blue, correctRed, correctGreen, correctBlue); }}>
            Guess
          </div>
        </button>
     </div>
     <div id='myguess'></div>
    </div>
  );
}

export default App;
