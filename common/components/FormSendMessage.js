import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

const FormSendMessage = (props) => {
	const { handleSubmit, reset, sendMessage, finishScroll } = props
	return (
		<form className="form" onSubmit = { 
			handleSubmit((date) => {
				if(date.message.length > 0) {
					finishScroll()	
					sendMessage(date.message)
					reset()
				}
			})
		}>
	    <div> 
	       <Field name="message" component="textarea" rows="5" className = 'textarea'/>
	    </div>
	    <button className='btn btn-primary' type='submit'>Submit</button>
	  </form>
	)
}


FormSendMessage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  finishScroll: PropTypes.func.isRequired,
}

export default reduxForm({ 
  form: 'sendMessageForm'
})(FormSendMessage)
