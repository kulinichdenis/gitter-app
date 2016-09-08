const initialState = {
	token: '',
	user: {}
}

export default (state=initialState, action) => {
	switch(action.type) {
		case 'AUTH_SET':
			return { ...state, token: action.auth.tokren, user: action.auth.user }
		case 'AUTH_OUT':
			return {}
		default:
			return state 	
	}
}