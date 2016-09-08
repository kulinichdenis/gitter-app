import { connect } from 'react-redux'
import MainLayout from '../components/MainLayout'

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(MainLayout)
