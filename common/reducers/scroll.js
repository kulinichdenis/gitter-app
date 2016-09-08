export default (state = { scrollFinish: true, scroll: null, scrollStart: false}, action) => {
	switch(action.type) {
		case 'DISABLE_SCROLL':
			return { ...state, scrollFinish: false, scroll: null, scrollStart: false }
		
		case 'SET_FINISH_SCROLL':
			return { ...state, scrollFinish: true, scroll: null, scrollStart: false }	
		
		case 'SET_START_SCROLL':
			return { ...state, scroll: action.scrollHeight, scrollStart: true }
		default:
			return state 	
	}
}