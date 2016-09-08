export default (state = { intervalId: null }, action) => {
	switch(action.type) {
		case 'START_WATCH':
			return { ...state, intervalId:  action.intervalId }
		case 'STOP_WATCH':
			return { ...state, intervalId: null }
		default:
			return state 
	}
}