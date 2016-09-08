import fetch from 'isomorphic-fetch'

export const fetchRooms = (token, userId) => {
  return (dispatch, getState) => {  
    fetch(`https://api.gitter.im/v1/user/${userId}/rooms`, { headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` 
    }}).then((json) => json.json()).then(result => { 
      dispatch({type: 'SET_ROOMS', rooms: result}) 
    })
  }
}

export const activeRoomDefault = () => ({type: 'ACTIVE_ROOM_DEFAULT'})

export const getMessagesFromRoom = (token, roomId, beforeId) => {
  return (dispatch, state ) => {
    fetch(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages?limit=50`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(json => json.json())
    .then(result => {
      dispatch({type: 'SET_ALL_MESSAGES', messages: result, roomId})
    })
  }
}

export const getNewMessagesFromRoom = (token, roomId, afterId) => {
  return (dispatch, state ) => {
    fetch(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages?afterId=${afterId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(json => json.json())
    .then(result => { 
      if (result.length > 0 ) {
        dispatch({ type: 'ADD_NEW_MESSAGES', messages: result })
      }
    })
  }
}

export const loadingMessagesFromRoom = (token, roomId, beforeId, scrollHeight) => {
  return (dispatch, state ) => {
    fetch(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages?beforeId=${beforeId}&limit=30`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(json => json.json())
    .then(messages => {
      dispatch({type: 'SET_START_SCROLL', scrollHeight})
      dispatch({type: 'LOADING_MESSAGES', messages})
    })
  }
}

export const sendMessage = (roomId, token, message) => {
  return (dispatch, state) => {
    fetch(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({text:`${message}`})
    }).then(json => json.json()).then(result => {
      dispatch({type: 'SEND_MESSAGE', message: result })
  })
}}

export const searchRooms = (token, searchRooms) => {
  return (dispatch, state) => {
    fetch(`https://api.gitter.im/v1/rooms?q=${searchRooms}`, { headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }}).then((json) => json.json()).then(result => { 
      dispatch({ type: 'SEARCH_ROOMS', rooms: result.results, searchRoom: searchRooms }) 
    })  
  }
}

export const joinToRoom = (token, userId, roomId) => {
  return (dispatch, state) => {
    fetch(`https://api.gitter.im/v1/user/${userId.id}/rooms`, { 
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`},
      body: JSON.stringify({id:`${roomId}`})
    }).then(json => json.json()).then(result => {
      dispatch({type: 'ADD_JOIN_ROOM', room: result })
    })
  }
}

export const leaveRoom = (token, userId, roomId) => {
  return (dispatch, state) => {
    fetch(`https://api.gitter.im/v1/rooms/${roomId}/users/${userId.id}`, { 
      method: 'DELETE',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`}
    }).then(json => json.json()).then(result => {
      dispatch({type: 'LEAVE_ROOM', roomId: roomId })
    })    
  }
}

export const startWatch = (fn) => {
  return { type: 'START_WATCH', intervalId: setInterval(fn, 10000) }
}

export const stopWatch = (intervalId) => {
  clearInterval(intervalId)  
  return (dispatch, state) => {
    dispatch({ type: 'STOP_WATCH' })
  } 
}

export const disableScroll = () => ({type: 'DISABLE_SCROLL'}) 
export const startScroll = () => ({type: 'SET_START_SCROLL'}) 
export const finishScroll = () => ({type: 'SET_FINISH_SCROLL'}) 
