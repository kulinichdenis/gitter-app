import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getMessagesFromRoom } from '../actions' 
import { sendMessage } from '../actions'
import { loadingMessagesFromRoom } from '../actions'
import { getNewMessagesFromRoom } from '../actions'
import { startWatch } from '../actions'
import { stopWatch } from '../actions'
import { activeRoomDefault } from '../actions'
import { disableScroll } from '../actions'
import { finishScroll } from '../actions'
import Room from '../components/Room'


const mapStateToProps = (state, ownProps) => {
	const position = ownProps.params.splat.indexOf('=')
	return {
		token: state.auth.token,
		roomId: ownProps.params.splat.slice(position+1),
		messages: state.rooms.activeRoom.messages,
		loading: state.rooms.activeRoom.loading,
		scroll: state.scroll,
		watch: state.watch.intervalId
	}
}

const mapDispatchToProps = (dispatch) => {
	return { 
		getMessagesFromRoom: bindActionCreators(getMessagesFromRoom, dispatch),
		sendMessage: bindActionCreators(sendMessage, dispatch),
		activeRoomDefault: bindActionCreators(activeRoomDefault, dispatch),
		loadingMessagesFromRoom: bindActionCreators(loadingMessagesFromRoom, dispatch),
		getNewMessagesFromRoom: bindActionCreators(getNewMessagesFromRoom, dispatch),
		startWatch:  bindActionCreators(startWatch,dispatch),
		stopWatch: bindActionCreators(stopWatch,dispatch),
		disableScroll: bindActionCreators(disableScroll, dispatch), 
		finishScroll: bindActionCreators(finishScroll, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)