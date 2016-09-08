const initialState = {
	roomList:[], 
	activeRoom: { room: null, messages: [], sendMessage: null, loading: false },
	findRooms: { name: null, rooms:[] }
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'SET_ROOMS':
			return { ...state, roomList: action.rooms }
		case 'ADD_JOIN_ROOM':
			return { ...state, roomList: [ ...state.roomList, action.room ] }	 
		case 'LEAVE_ROOM':
			return { ...state, roomList: state.roomList.filter(room => room.id != action.roomId)} 
		case 'SET_ALL_MESSAGES':
			return { ...state, activeRoom: { ...state.activeRoom, room: action.roomId, messages: action.messages } }
		case 'LOADING_MESSAGES':
			return { ...state, activeRoom: {...state.activeRoom, messages: [...action.messages, ...state.activeRoom.messages], loading: true} }
		case 'ACTIVE_ROOM_DEFAULT':
			return { ...state, activeRoom: { ...state.activeRoom, room: null, messages: [], sendMessage: null, loading: false } }
		case 'ADD_NEW_MESSAGES':
			return { ...state, activeRoom: { ...state.activeRoom, messages: [...state.activeRoom.messages, ...action.messages], loading: null }}
		case 'SEND_MESSAGE':
			return { ...state, activeRoom: { ...state.activeRoom, messages: [...state.activeRoom.messages, action.message]} } 
		case 'SEARCH_ROOMS':
			return {...state, findRooms: { ...state.findRooms, searchRoom: action.searchRoom, rooms: action.rooms || [] } }
		default:
			return state	
	}
}