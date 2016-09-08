import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MainApp from '../components/MainApp'
import * as CounterActions from '../actions'

function mapStateToProps(state) {
  return {
    auth: state.auth,
    rooms: state.rooms.roomList,
    findRooms: state.rooms.findRooms.rooms
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
