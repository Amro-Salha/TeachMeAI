import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { login } from '/Users/amrosalha/Desktop/personal projects/TeachMe/my-app/frontend/src/actions/auth.js'

const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    const {email, password} = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

    const [loggedIn, setLoggedIn] = useState(false)

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    }


    useEffect(() => {
        if (isAuthenticated){
            setLoggedIn(true)
            setFormData({
                email: '',
                password: ''
            })
        }
    },[isAuthenticated])


    return(
        <Container>
            <form className={loggedIn ? 'd-none' : 'signup'} onSubmit={e => onSubmit(e)}>
                <h1>Sign in</h1>
                <p>Sign into your Account</p>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                        style={{marginBottom: '5px'}}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>

                <button className='signUp-button' type='submit' style={{marginTop: '10px'}}>Log In</button>

            </form>
        </Container>

    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
