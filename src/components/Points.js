import React from "react";

const Points = (props) => {
  return (
    <div
      class="point"
      onClick={props.onClick}
      value={props.value}
      style={{
        top: props.top + "px",
        left: props.left + "px",
        zIndex: props.number_points - props.value,
      }}
    >
      {props.value}
    </div>
  );
};

export default Points;
