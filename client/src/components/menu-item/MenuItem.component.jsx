import React from "react";
import { withRouter } from "react-router";

import "./Menuitem.styles.scss";

function MenuItem({ title, sneaker, imageUrl, big, linkUrl, history, match }) {
  MenuItem.defaultProps = {
    sneaker: false,
    big: false,
  };
  const style = { backgroundImage: `url(${imageUrl})` };
  return (
    <div
      className={`menu-item ${sneaker && "menu-sneakers"} ${big && "big"}`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
      // insecure `${match.url}/${linkUrl}`
    >
      <div className='background-image' style={style}>
        {/* decouple the background image from the menu item,
        we only need to the background image to increase*/}
        <div className='content'>
          <h1 className='title'>{title.toUpperCase()}</h1>
          <span className='subtitle'>SHOP NOW</span>
        </div>
      </div>
    </div>
  );
}
export default withRouter(MenuItem);
