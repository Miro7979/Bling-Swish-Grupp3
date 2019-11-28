import React from 'react';

export default React.createContext({
  // This is the startup phase/boot/loader of the app
  // (doing DB calls to see what to render)
  booting: true,
  // userdata is null until we fetch actual data
  user: {
    favourites: [],
    role: 'visitor'
  },
  showNoti: false,
  reload: false
});