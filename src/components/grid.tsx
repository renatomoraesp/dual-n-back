import React, { useEffect, useRef } from 'react';
import CSS from 'csstype';
import A from '../audio_files/audio-a.mp3';
import T from '../audio_files/audio-t.mp3';
import L from '../audio_files/audio-l.mp3';
import C from '../audio_files/audio-c.mp3';
import H from '../audio_files/audio-h.mp3';
import S from '../audio_files/audio-s.mp3';

const Grid: React.FC<GridProps> = ({ name }) => {

  const gridRefs = useRef<Array<HTMLDivElement>>([]);
  const matchRefs = useRef<Array<HTMLDivElement>>([]);
  const dummyArray = Array.from(Array(9).keys());
  const letters = [[A, 'a'], [T, 't'], [L, 'l'], [C, 'c'], [H, 'h'], [S, 's']];
  
  const haveBeenColored: Array<number> = [];
  const haveBeenSaid: Array<String> = [];
  const hasGridRepeated: Array<number> = [];
  const hasLetterRepeated: Array<number> = [];
  const numberOfSteps: number = 6;

  const pushGridRef = (el: HTMLDivElement) => {
    gridRefs.current.push(el);
  }

  const pushMatchRef = (el: HTMLDivElement) => {
    matchRefs.current.push(el);
  }

  const playAudio = () => {
    const index = Math.floor(Math.random() * 6); 
    const letter = new Audio();
    letter.src = letters[index][0];
    haveBeenSaid.push(letters[index][1]);
    
    if (haveBeenSaid.length > numberOfSteps + 1) {
      haveBeenSaid.shift();
    }
    
    letter.play();
  }

  const testForAudioRepetition = () => {
    if (haveBeenSaid[0] === haveBeenSaid[numberOfSteps]) {
      hasLetterRepeated.push(1);
    }
    else {
      hasLetterRepeated.push(0);
    }

    if (hasLetterRepeated.length > numberOfSteps + 1) {
      hasLetterRepeated.shift();
    }
  }

  
  const colorGridItem = () => {
    const index = Math.floor(Math.random() * 9);
    gridRefs.current[index].style.backgroundColor = 'blue';
    haveBeenColored.push(index);
    
    if (haveBeenColored.length > numberOfSteps + 1) {
      haveBeenColored.shift();
    }
    
    setTimeout(() => {
      gridRefs.current[index].style.backgroundColor = 'white';
    }, 400);
  }

  const testForGridRepetition = () => {
    if (haveBeenColored[0] === haveBeenColored[numberOfSteps]) {
      hasGridRepeated.push(1);
    }
    else {
      hasGridRepeated.push(0); 
    }

    if (hasGridRepeated.length > numberOfSteps + 1) {
      hasGridRepeated.shift();
    }
  }
  
  const colorMatchHeading = (matchIndex: number, matchColor: string, duration: number) => {
    matchRefs.current[matchIndex].style.color = matchColor;
    setTimeout(() => {
      matchRefs.current[matchIndex].style.color = 'black';
    }, duration);
  }

  const initializeTimer = () => {
    return setInterval(() => {
      if (hasGridRepeated[hasGridRepeated.length - 1] === 1) {
        colorMatchHeading(0, 'red', 500);
        hasGridRepeated[hasGridRepeated.length - 1] = 0;
      }

      if (hasLetterRepeated[hasLetterRepeated.length - 1] === 1) {
        colorMatchHeading(1, 'red', 500);
        hasLetterRepeated[hasLetterRepeated.length - 1] = 0;
      }
      
      colorGridItem();
      testForGridRepetition();
      playAudio();
      testForAudioRepetition();

      console.log('have been colored:\n' + haveBeenColored);
      console.log('has the grid repeated?\n' + hasGridRepeated);
      console.log('have been said:\n' + haveBeenSaid);
      console.log('has the letter repeated?\n' + hasLetterRepeated);
    }, 2000);
  }

  useEffect(() => {
    console.log('I\'m returning once\n');
    let isTheTaskBeingPlayed: number = 0;
    let timer: ReturnType<typeof setTimeout>;

    window.addEventListener('keydown', (e) => {
      if (e.key === ' ' && !isTheTaskBeingPlayed) {
        timer = initializeTimer();
        isTheTaskBeingPlayed++;
      }

      else if (e.key === 'Escape' && isTheTaskBeingPlayed) {
        clearInterval(timer);
        haveBeenColored.length = 0;
        hasGridRepeated.length = 0;
        haveBeenSaid.length = 0;
        hasLetterRepeated.length = 0;
        isTheTaskBeingPlayed--;
      }

      else if (e.key === 'a' && isTheTaskBeingPlayed) {
        if (haveBeenColored.length >= numberOfSteps) {
          if (hasGridRepeated[hasGridRepeated.length - 1] === 1) {
            colorMatchHeading(0, 'green', 800);
            hasGridRepeated[hasGridRepeated.length - 1] = 0;
          }
          else {
            colorMatchHeading(0, 'red', 800);
          }
        }
        else {
          colorMatchHeading(0, 'blue', 800);
        }
      }

      else if (e.key === 'l' && isTheTaskBeingPlayed) {
        if (haveBeenSaid.length >= numberOfSteps) {
          if (hasLetterRepeated[hasLetterRepeated.length - 1] === 1) {
            colorMatchHeading(1, 'green', 800);
            hasLetterRepeated[hasLetterRepeated.length - 1] = 0;
          }
          else {
            colorMatchHeading(1, 'red', 800);
          }
        }
        else {
          colorMatchHeading(1, 'blue', 800);
        }
      }
    });
  }, []);

    const styleForMasterDiv: CSS.Properties = {
        display: 'grid',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '0'
    }

    const styleForFlexDiv: CSS.Properties = {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
    }

    const styleForLeftContainer: CSS.Properties = {
        width: '28vw',
        height: '100vh',
        backgroundColor: 'red'
    }

    const styleForMiddleContainer: CSS.Properties = {
        width: '44vw',
        height: '100vh',
        paddingLeft: '3vw',
        paddingRight: '3vw'
    }

    const styleForRightContainer: CSS.Properties = {
        width: '28vw',
        height: '100vh',
        backgroundColor: 'blue'
    }

    const styleForGridContainer: CSS.Properties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        width: '100%'
    }

    const styleForGridItem: CSS.Properties = {
      textAlign: 'center',
      fontSize: '2vh',
      paddingTop: '11vh',
      paddingBottom: '11vh',
      border: '0.1vw solid rgba(0, 0, 0, 1)',
      width: '100%'
    }

    return (
        <div style={ styleForFlexDiv }>
          <div style={ styleForLeftContainer }>
            <h1>Some content on the left</h1>
          </div>
          
          <div style={ styleForMiddleContainer }>
            <h1>{ name }</h1>
            <div style={ styleForGridContainer }>
              {
                dummyArray.map(item => {
                  return(
                    <div ref={ pushGridRef } style={ styleForGridItem }> </div>
                  )
                })
              }
            </div>
            <br />
            <div style={ { width: '100%' } }>
              <span ref={ pushMatchRef } style={ { float: 'left', fontSize: '3.4vh' }}>A: Position match</span>
              <span ref={ pushMatchRef } style={ { float: 'right', fontSize: '3.4vh' } }>L: Audio match</span>
            </div>
          </div>
          
          <div style={ styleForRightContainer }>
            <h1>Some content on the right</h1>
          </div>
        </div>
    );
}

export default Grid;