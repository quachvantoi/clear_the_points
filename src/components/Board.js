import React, { useState } from "react";
import Points from "./Points";
var position_board = [];
var time;
var timeline;
var sohientai = 0;
var lose_game = false;
var current_number_points = 0;

const show_box_mes = (result, current_point, time) => {
  let box_mesag = document.querySelectorAll(".box_mesag p");
  document.getElementsByClassName("box_mesag")[0].classList.remove("hidden");
  if (result === "win") {
    box_mesag[0].textContent = "Chiến Thắng";
    box_mesag[1].textContent =
      "Chúc mừng bạn đã hoàn thành " +
      current_point +
      " Points, với thời gian " +
      time +
      "s";
  } else {
    box_mesag[0].textContent = "Thua Cuộc";
    box_mesag[1].textContent =
      "Bạn đã thua với số Points đã hoàn thành là: " +
      current_point +
      ". Cố gắn lên!!!";
  }
};
const Wanning = (number) => {
  document.getElementsByClassName("box_mesag")[0].classList.remove("hidden");
  let box_mesag = document.querySelectorAll(".box_mesag p");
  box_mesag[0].textContent = " Cảnh báo ";
  box_mesag[1].textContent = number + " Points ư, đừng đùa nữa!!!";
};

const Help = () => {
  let help_item = document.querySelectorAll(".point:not(.hidden)")[0];
  if (!help_item) {
    return;
  }
  if (help_item.style.backgroundColor === "orange") {
    return;
  }
  help_item.style.backgroundColor = "orange";
  setTimeout(() => {
    help_item.style.backgroundColor = "";
  }, 1000);
};

//main
const Board = () => {
  const [Number_points, setNumber] = useState(1);
  const [board, setBoard] = useState(position_board);

  const change = (event) => {
    setNumber(Number(event.target.value));
    setBoard(position_board);
  };
  const StartGame = () => {
    if (Number_points > 5000 || Number_points === 0) {
      Wanning(Number_points);
      return;
    }
    lose_game = false;
    current_number_points = Number_points;
    // set points
    position_board = [];
    for (let index = 0; index < current_number_points; index++) {
      position_board.push({
        top: Math.randomInt(
          0,
          document.getElementsByClassName("box_game")[0].clientWidth - 40
        ),
        left: Math.randomInt(
          0,
          document.getElementsByClassName("box_game")[0].clientHeight - 40
        ),
      });
    }
    setBoard(position_board);
    // clear hidden
    [...document.getElementsByClassName("hidden")]
      .reverse()
      .slice(1)
      .map((item, index) => item.classList.remove("hidden"));
    // time line
    time = 0;
    sohientai = 0;
    clearInterval(timeline);
    timeline = setInterval(function () {
      time = Math.round((time + 0.01) * 100) / 100;
      document.getElementById("count").textContent = time;
    }, 10);

    // text convert
    document.getElementById("start").textContent = "Restart";
    //scroll to view
    document.getElementsByClassName("box_game")[0].scrollIntoView(true);
  };
  const handleClick = (event) => {
    if (lose_game) {
      return;
    }
    if (Number(event.target.textContent) === sohientai + 1) {
      event.target.classList.add("hidden");
      sohientai++;
      // console.log("số hiện tại", sohientai, current_number_points);
      if (sohientai === current_number_points) {
        // win game
        clearInterval(timeline);
        show_box_mes("win", sohientai, time);
        return;
      }
    } else {
      lose_game = true;
      clearInterval(timeline);
      show_box_mes("lose", sohientai, time);
    }
  };
  Math.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return (
    <div className="center_screen">
      <h1>LET'S PLAY</h1>
      <table>
        <ul>
          <li>
            <p>Points</p>
          </li>
          <li>
            <input
              type="number"
              id="number_points"
              value={Number_points}
              onChange={change}
            />
          </li>
        </ul>
        <ul>
          <li>
            <p>Time</p>
          </li>
          <li>
            <p id="count">0.00</p>
          </li>
        </ul>
        <ul>
          <li>
            <button id="start" onClick={StartGame}>
              Play
            </button>
          </li>
          <li className="idea" title="Gợi ý" onClick={Help}></li>
        </ul>
      </table>
      <div class="box_game">
        {board.map((item, index) => (
          <Points
            key={index + 1}
            value={index + 1}
            onClick={handleClick}
            top={item.top}
            left={item.left}
            number_points={current_number_points}
          ></Points>
        ))}
      </div>
    </div>
  );
};

export default Board;
