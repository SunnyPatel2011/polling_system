import React, { useState } from 'react';
import './btnss.css';

function App() {
  const [buttonState, setButtonState] = useState({
    className: 'submit',
    text: 'Submit',
  });

  const handleClick = () => {
    setButtonState({
      className: 'submit process',
      text: 'Processing',
    });

    setTimeout(() => {
      setButtonState({
        className: 'submit submitted',
        text: (
          <>
            Submitted
          </>
        ),
      });
    }, 5000);
  };

  return (
    <div className="App">
      <button id="btn" className={buttonState.className} onClick={handleClick}>
        {buttonState.text}
      </button>
    </div>
  );
}

export default App;
