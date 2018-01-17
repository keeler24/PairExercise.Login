import React from 'react'
import {connect} from 'react-redux'

const UserPage = (props) => {
  const {handleClick} = props

  return (
    <div className='h100 w100 flex column align-items-center justify-center'>
      <div className='flex'>
        <img className='rounded mr1' />
        <h1>Welcome back!</h1>
      </div>
      <div>
        <button className='btn bg-red white p1 rounded' onClick={handleClick}>Logout</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    // your code here
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick () {
      // your code here
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
