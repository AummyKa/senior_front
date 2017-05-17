// import React from 'react';
// import Cookies from 'js-cookie'

export const requireAuth = (nextState, replace, page) => {

  let token = Cookies.get('token')
  let userRole = Cookies.get('userRole')

  if (!token) {
      replace({
        pathname: '/'
      })
  }


    // switch (page) {
    //
    //     case 'home':
    //       if(userRole!== "Manager"){
    //         replace({ pathname: '/invalid' })
    //       }
    //       break;
    //
    //     case 'staff':
    //       if(userRole === "Guide"){
    //         replace({ pathname: '/invalid' })
    //       }
    //       break;
    //     case 'schedule':
    //     if(userRole === "Guide"){
    //         replace({ pathname: '/invalid' })
    //     }
    //     // case 'guide':
    //
    //     case 'pendinglist':
    //     if(userRole !== "Manager"){
    //       replace({ pathname: '/invalid' })
    //     }
    //     break;
    //
    //     case 'tours':
    //     if(userRole === "Guide"){
    //       replace({ pathname: '/invalid' })
    //     }
    //     break;
    //
    //     case 'bookingMethod':
    //     if(userRole === "Guide"){
    //       replace({ pathname: '/invalid' })
    //     }
    //     break;
    //
    //     default:
    //       return ''
    //     }



}
