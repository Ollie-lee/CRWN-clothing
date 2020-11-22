import { createSelector } from 'reselect';

const selectDirectory = (state) => state.directory;

export const selectDirectoryMenuItems = createSelector(
  [selectDirectory],
  (directory) => directory.menuItems
);
