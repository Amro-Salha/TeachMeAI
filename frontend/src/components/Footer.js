import { Container, Row, Col } from 'react-bootstrap'
import logo from '../assets/img/logo.png'
import { Linkedin } from 'react-bootstrap-icons'

export const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <Row className='align-item-center'>
                    <Col sm={4}>
                        <img src={logo} alt='Logo' />
                    </Col>
                    <Col sm={8} className='text-center text-sm-end'>
                        <p>CopyRight 2023. All Rights Reserved<br />
                        Full Stack Engineered and designed by Amro Salha<br />
                        <a style={{textDecoration:'None', color:'inherit'}} href='https://www.linkedin.com/in/amro-salha/' target='_blank' rel="noreferrer"><Linkedin size={25} className='linkedin'/></a></p>

                    </Col>
                </Row>
            </Container>
        </footer>

    )
}
