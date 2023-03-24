import { Container } from 'react-bootstrap'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { verify } from '/Users/amrosalha/Desktop/personal projects/TeachMe/my-app/frontend/src/actions/auth.js'

const Activate = ({ verify }) => {

    const [verified, setVerified] = useState(false)
    const { uid, token } = useParams()
    const navigate = useNavigate()


    const verify_account = e => {
        verify(uid,token)
        setVerified(true)
    }

    if (verified) {
        navigate('/')
    }

    return(
        <Container className={verified ? 'd-none' : 'signup'} style={{marginTop: '200px'}}>
            <h1>Verify your Account:</h1>
            <button
                onClick={verify_account}
                style={{marginTop:'50px'}}
                type='button'
                className='btn btn-primary'
            >
                Verify
            </button>
        </Container>

    )
}

export default connect(null, { verify })(Activate)
