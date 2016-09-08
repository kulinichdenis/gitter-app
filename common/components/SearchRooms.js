import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash'

const SearchRooms = (props) => {
	const { handleSubmit, searchRooms} = props
	const search = _.throttle(searchRooms, 2000)
	return (
		<form onChange = { (date) => { search(date.target.value) } }>
			<div className='form-group'>
				<label>Search Rooms</label>
				<Field name='searchRooms' className='form-control' component='input' type='text' placeholder='search rooms'/>
			</div>
		</form>
	)
} 

SearchRooms.PropTypes = {
	handleSubmit: PropTypes.func.isRequired,
	searchRooms: PropTypes.func.isRequired
}

export default reduxForm({form: 'searchRooms'})(SearchRooms)