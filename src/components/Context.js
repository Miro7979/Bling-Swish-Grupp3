import React from 'react';

export default React.createContext({
  // This is the startup phase/boot/loader of the app
  // (doing DB calls to see what to render)
  booting: true,
  // userdata is null until we fetch actual data
  user: {
    favourites: [],
    limit: 0,
    role: 'visitor'
  },
  showNoti: false,
  reload: 0,
  restartSSE: 0
});