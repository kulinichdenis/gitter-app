import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import FormSendMessage  from './FormSendMessage'
import { Button } from 'react-bootstrap'

class Room extends Component {
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.messages.length != this.props.messages.length) {
			this.props.stopWatch(this.props.watch)
			this.props.startWatch(
				this.props.getNewMessagesFromRoom.bind(
					null, this.props.token, this.props.roomId, nextProps.messages[nextProps.messages.length - 1].id
				)
			)	
		}
	}

	componentDidMount() { 
		this.props.getMessagesFromRoom(this.props.token, this.props.roomId)
	}

	componentWillUnmount() {
		this.props.finishScroll()
		this.props.activeRoomDefault()
		this.props.stopWatch(this.props.watch)
	}

	componentDidUpdate() {
		if (this.props.scroll.scrollFinish) {
			this.refs.chat.scrollTop = this.refs.chat.scrollHeight
		} 

		if (this.props.scroll.scrollStart) {
			this.refs.chat.scrollTop = this.props.scroll.scroll 
		}

		this.refs.chat.addEventListener('scroll', () => { 
			if(this.refs.chat.scrollTop === 0) {
				this.props.loadingMessagesFromRoom(this.props.token, this.props.roomId, this.props.messages[0].id, this.refs.chat.scrollHeight)
			}
			
			if(this.refs.chat.scrollHeight - this.refs.chat.scrollTop - this.refs.chat.clientHeight < 400 ) {
				if(!this.props.watch){
					this.props.disableScroll();	
					this.props.startWatch(
						this.props.getNewMessagesFromRoom.bind(null, this.props.token, this.props.roomId, this.props.messages[this.props.messages.length - 1].id)
					)	
				}
			}	else {
				if(this.props.watch) {
					this.props.disableScroll();	
					this.props.stopWatch(this.props.watch)
				}
			}

		});
	}
	
	render() {
		const { messages, token, roomId, finishScroll } = this.props
		return(
			<div className='container'>
				<div className='chat' ref="chat">
					{ messages.map(message => {
						return (
							<div key={message.id} className='well'>
								<p className='clearfix title-message'>
									<span className='pull-left'>{message.fromUser.displayName}</span> 
									<span className='pull-right'>{message.sent.slice(11,16)} - {message.sent.slice(0,10)}</span>
								</p>
								<p className='body-message'>{message.text}</p>
							</div>
						)
					})}
				</div>
				 <Button className='m-t-10' bsStyle='primary' bsSize='xsmall' 
				 		onClick={()=>{ this.refs.chat.scrollTop = this.refs.chat.scrollHeight }}
				 > To Bottom
				 </Button>	
				<FormSendMessage finishScroll = { finishScroll } sendMessage = { this.props.sendMessage.bind(null, roomId, token) }/>
			</div>
		)
	}
}

Room.propTypes = {
	messages: PropTypes.array.isRequired,
	token: PropTypes.string.isRequired,
	roomId: PropTypes.string.isRequired,
	finishScroll: PropTypes.func.isRequired,
	startWatch: PropTypes.func.isRequired,
	stopWatch: PropTypes.func.isRequired,
	activeRoomDefault: PropTypes.func.isRequired,
	getMessagesFromRoom: PropTypes.func.isRequired,
	getNewMessagesFromRoom: PropTypes.func.isRequired,
	scroll: PropTypes.object.isRequired,
	watch: PropTypes.any  
}

export default Room

