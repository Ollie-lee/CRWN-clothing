import React from "react";

import "./Directory.styles.scss";

export default function Directory({ children, columnWidth }) {
  const style = {
    gridTemplateColumns: `repeat(auto-fit, minmax(${columnWidth}, 1fr))`,
  };
  return (
    <div className='directory' style={style}>
      {children}
    </div>
  );
}
