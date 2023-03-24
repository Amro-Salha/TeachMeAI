import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Player } from '@lottiefiles/react-lottie-player'
import curr_bot from "../assets/loading/curr_bot.json"
import hint_bot from "../assets/loading/hint_bot.json"
import question_bot from "../assets/loading/question_bot.json"

export const BotInfo = () => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      return (
        <section className='bot' id='bots'>
            <Container>
                <Row>
                    <Col>
                        <div className="bot-box">
                            <h2>
                                Bots
                            </h2>
                            <p>Different learning bots to help you learn!</p>
                            <Carousel responsive={responsive} infinite={true} className="bot-slider">
                                <div className="item">
                                    <Player
                                        autoplay
                                        loop
                                        src={curr_bot}
                                        style={{ height: '300px', width: '300px' }}>
                                    </Player>
                                    <h5>Curriculum Bot</h5>
                                    <p><b>Want to learn something new?</b></p><p>Curriculum bot builds out the skeleton to get started on learning whatever you want!</p>
                                </div>
                                <div className="item">
                                    <Player
                                        autoplay
                                        loop
                                        src={hint_bot}
                                        style={{ height: '300px', width: '300px' }}>
                                    </Player>
                                    <h5>Hint Bot</h5>
                                    <p><b>Want a nudge in the right direction?</b></p><p>Hint bot will guide you to the answer without directly giving it to you!</p>
                                </div>
                                <div className="item">
                                    <Player
                                        autoplay
                                        loop
                                        src={question_bot}
                                        style={{ height: '300px', width: '300px' }}>
                                    </Player>
                                    <h5>Practice Bot</h5>
                                    <p><b>Want to practice your skills?</b></p><p> Practice bot will produce practice questions for you on whatever topic you like!</p>
                                </div>
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
      )
}
