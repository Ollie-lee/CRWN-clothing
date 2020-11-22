import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../../components/menu-item/MenuItem.component';
import Directory from '../../components/Directory/Directory.component';

import { selectDirectoryMenuItems } from '../../redux/directory/directory.selector';

function DirectoryWrapper({ menuItems }) {
  const upperItems = menuItems.slice(0, 3);
  const lowerItems = menuItems.slice(3, 5);

  return (
    <>
      <Directory columnWidth="30rem">
        {upperItems.map((item, i) =>
          i === 2 ? (
            <MenuItem key={item.id} {...item} sneaker={true} />
          ) : (
            <MenuItem key={item.id} {...item} />
          )
        )}
      </Directory>

      <Directory columnWidth="50rem">
        {lowerItems.map((item) => (
          <MenuItem key={item.id} {...item} big={true} />
        ))}
      </Directory>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  menuItems: selectDirectoryMenuItems,
});

export default connect(mapStateToProps)(DirectoryWrapper);
