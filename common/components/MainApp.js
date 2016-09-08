import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import SearchRooms from './SearchRooms'

class MainApp extends Component {
  
  componentDidMount() {
    if(this.props.auth.token) {
      this.props.fetchRooms(this.props.auth.token, this.props.auth.user.id)
    }
  }

  render() {
    const { searchRooms, auth, rooms, findRooms, joinToRoom, leaveRoom } = this.props

    return (
      <div>  
        <div className='container'>
          { auth.token ?         
            <Grid>
            <Row className="show-grid">
              <Col md={6} mdPush={6}>
                <h4>Your rooms</h4>
                <table className="table">
                  <tbody>
                    { rooms.map((room) => {
                        return (
                          <tr key={room.id}>
                            <td>
                             <span><Link to={'room'+room.url+'&id='+ room.id}>{room.name}</Link></span>
                            </td>
                            <td>
                              <span className='btn btn-danger' onClick={ () => { leaveRoom(auth.token, auth.user, room.id)} }>Leave Room</span>
                            </td>
                          </tr>
                        )
                    })}      
                  </tbody>
                </table>
              </Col>
              <Col md={6} mdPull={6}>
                  { auth.token &&
                    <SearchRooms searchRooms = { searchRooms.bind(null, auth.token) } />
                  }
                  <div>
                    {
                      findRooms.filter(item => {
                        const hasCompare = rooms.filter((joinRoom) => {
                            return item.id === joinRoom.id
                        })

                        return hasCompare.length > 0 ? false : true
                      }).map(room => {
                        return (
                          <div key={room.id} className='well well-sm'><span>{room.name}</span>
                            <Button className='pull-right' bsStyle='primary' bsSize='xsmall' onClick={()=>{joinToRoom(auth.token, auth.user, room.id)}}>
                              Join
                            </Button>
                          </div>
                        )
                      })
                    }
                  </div>
                
              </Col>
            </Row>
            </Grid>
          :
            <div className="alert alert-success text-center" role="alert">You need authenticated</div>
          }       
        </div>
      </div>
    )
  }
}

MainApp.propTypes = {
  auth: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  searchRooms: PropTypes.func.isRequired,
  findRooms: PropTypes.array.isRequired,
  joinToRoom: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  fetchRooms: PropTypes.func.isRequired
}

export default MainApp
