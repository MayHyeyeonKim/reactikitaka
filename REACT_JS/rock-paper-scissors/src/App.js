import React, { useState, useEffect } from "react";
import "./App.css";
import Box from "./component/box/Box";
import Button from "./component/button/Button";
import Score from "./component/score/Score";

import cuteRock from "./component/assets/cute_rock.png"
import cutePaper from "./component/assets/cute_paper.png"
import cuteScissors from "./component/assets/cute_scissors.png";
import questionImage from "./component/assets/question.png";

//1. 2boxes (title, image, result-value)
//2. rock paper scissors buttons
//3. The value clicked is shown in the box when the button is clicked,
//4. The computer player selects an item randomly
//5. Decide who is winner based on the results of 3 and 4
//6. The border color will be changed (winner - green, loser - red, tie - black)

const choice = {
  Rock: {
    name: "Rock",
    img: cuteRock,
  },
  Paper: {
    name: "Paper",
    img: cutePaper,
  },
  Scissors: {
    name: "Scissors",
    img: cuteScissors,
  },
  Empty: {
    name: "Empty",
    img: questionImage,
  },
};

function App() {
  const [userSelect, setUserSelect] = useState(choice.Empty);
  const [computerSelect, setComputerSelect] = useState(choice.Empty);
  const [result, setResult] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const play = (userChoice) => {
    console.log("User choice:", userChoice, "Choice object:", choice[userChoice]);
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    console.log("Computer choice:", computerChoice);
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
  };
  
  const judgement = (user, computer) => {
    console.log("Judgement called with:", user, computer);
    if (user.name === computer.name) {
      return "tie";
    } else if (
      (user.name === "Rock" && computer.name === "Scissors") ||
      (user.name === "Scissors" && computer.name === "Paper") ||
      (user.name === "Paper" && computer.name === "Rock")
    ) {
      setUserScore(userScore + 1);
      return "win";
    } else {
      setComputerScore(computerScore + 1);
      return "lose";
    }
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice).filter(key => key !=="Empty"); //객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    // console.log(randomItem);
    // console.log(itemArray);
    // console.log(final);
    return choice[final];
  };

  useEffect(()=>{
    console.log("useEffect1 Fireeee");
  }, []);

  useEffect(()=>{
    console.log("useEffect2 Fireee!!", userScore, "-", computerScore)
  },[userScore, computerScore])

  const resetGame = () => {
    setUserScore(0);
    setComputerScore(0);
    setUserSelect(choice.Empty);
    setComputerSelect(choice.Empty);
    setResult("");
  };

  return (
    <div className="app-main">
      {console.log("render하는 곳")}
      <div className="main">Rock Paper Scissors</div>
      <div className="score-main">
        <Score label="User Score" score={userScore} />
        <Score label="Computer Score" score={computerScore} />
      </div>
      <div className="button-main">
        <Button onClick={resetGame} choice="Reset" />
      </div>
      <div className="box-main">
        <Box title="You" item={userSelect} result={result} />
        <Box title="Computer" item={computerSelect} result={result} />
      </div>
      <div className="button-main">
        <Button onClick={play} choice="Rock" />
        <Button onClick={play} choice="Paper" />
        <Button onClick={play} choice="Scissors" />
      </div>
    </div>
  );
}

export default App;
