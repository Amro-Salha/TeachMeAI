import { useState, useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { ArrowRightCircle } from "react-bootstrap-icons"
import headerImg from "../assets/img/headerImg.png"
import { useSelector } from "react-redux";

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0) //determines which word is currently displayed on scren from toRotate
    const [isDeleting, setIsDeleting] = useState(false) // word being typed or deleted
    const [text, setText] = useState('') // portion of word showing
    const [delta, setDelta] = useState(300) //speed of letters being typed
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta)

        return () => { clearInterval(ticker) }
    })

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i]
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

        setText(updatedText)

        if (isDeleting) {
            setDelta(prevDelta => prevDelta)
        }
        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true)
            setDelta(prevDelta => prevDelta/1.5)
        } else if (isDeleting && updatedText === "") {
            setIsDeleting(false)
            setLoopNum(loopNum + 1)
            setDelta(200)
        }
    }

    const toRotate = ['Algebra', 'Coding', 'Skating']
    return (
        <section className='banner' id="home">
            <Container>
                <Row className="hero align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">{user ? `   Welcome, ${user.name}!` : 'Learn anything you want'}</span>
                        <h1>{`Teach me: `}</h1>
                        <div><h1><span className="wrap">- {text}</span></h1></div>
                        <p>Welcome to TeachMe.ai! An AI powered website with learning tools designed to help you get started on learning anything you like!</p>
                        <p>Scroll down to learn more about our different tools!</p>
                        <button>Get Started!<ArrowRightCircle size={25} /></button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img className='pencil' src={headerImg} alt="Header Img" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
