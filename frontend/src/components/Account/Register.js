import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { signup } from '/Users/amrosalha/Desktop/personal projects/TeachMe/my-app/frontend/src/actions/auth.js'
import {login} from '/Users/amrosalha/Desktop/personal projects/TeachMe/my-app/frontend/src/actions/auth.js'

const Register = ({ signup, isAuthenticated }) => {

    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
        re_password: ''
    })


    const {name, email, password, re_password} = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        if (password === re_password) {
            signup(name, email, password, re_password);
            setAccountCreated(true)
            login(email, password)
            window.location.reload()
        }
    }

    useEffect(() => {
        if (isAuthenticated){
            setFormData({
                name:'',
                email: '',
                password: '',
                re_password: ''
            })
        }
    },[isAuthenticated])

    return(
        <Container>
            <form className={accountCreated ? 'd-none' : 'signup'} onSubmit={e => onSubmit(e)}>
                <h1>Sign Up</h1>
                <p>Create an Account</p>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Name*'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                        style={{marginBottom: '5px'}}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
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
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                        style={{marginBottom: '5px'}}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>

                <button className='signUp-button' type='submit' style={{marginTop: '10px'}}>Sign Up</button>

            </form>
        </Container>

    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Register)
