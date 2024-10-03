import React from "react";

const Notify = () => {
  const OK_click = () => {
    document.getElementsByClassName("box_mesag")[0].classList.add("hidden");
  };
  return (
    <div className="box_mesag hidden">
      <p>Chiến Thắng</p>
      <p>Chúc mừng bạn đã vượt qua</p>
      <button onClick={OK_click}>OK</button>
    </div>
  );
};

export default Notify;
