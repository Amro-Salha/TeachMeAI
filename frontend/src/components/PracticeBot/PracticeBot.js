import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, ProgressBar, Button } from "react-bootstrap"
import { Player } from '@lottiefiles/react-lottie-player'
import brain_loader from "/Users/amrosalha/Desktop/personal projects/TeachMe/my-app/frontend/src/assets/loading/brain_loader.json"
import question_bot from '/Users/amrosalha/Desktop/personal projects/TeachMe/my-app/frontend/src/assets/loading/question_bot.json'
import { useSelector } from "react-redux";
import { Footer } from "../Footer";


function PracticeBot() {
  const [topicInput, setTopicInput] = useState("");
  const [number, setNumber] = useState(0)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const MY_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const PIC_KEY = process.env.REACT_APP_UNSPLASH_API_KEY

  async function onSubmit(event) {
        event.preventDefault();
        try {
            setLoading(true)
            setProgress(20)
            const url = "https://api.openai.com/v1/completions"
            const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `${MY_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Using HTML, create 2 tables:

                1. Practice Problems: In this table, display ${number} unique practice questions on the topic of ${topicInput}

                2. Answers: In this table, provide the answers to the questions in the previous table.

                Provide your response in HTML format as it will be displayed in a <div> tag on a separate site.`,
                temperature: 0.3,
                max_tokens: 3700
            }),
        });
        setProgress(70)
        const responseData = await response.json();
        const html = responseData.choices[0].text


        const imageURL = `https://api.unsplash.com/search/photos?query=${topicInput}`
        const imageResponse = await fetch(imageURL, {
            method: "GET",
            headers: {
                "Accept-Version": "v1" ,
                "Authorization" : `${PIC_KEY}`
            }
        })
        setProgress(85)
        const imgData = await imageResponse.json()


        const problemsUrl = 'http://localhost:8000/curriculums/problems/'
        const fetchConfig =
        {
          method: 'POST',
          body: JSON.stringify({user: user, name: topicInput, problems: html, imgUrl: imgData.results[1].urls.small}),
          headers: {
            'Content-type': 'text/html',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5MTY0ODIyLCJqdGkiOiIzMmNiYThlYjA2ZjI0YTkyOTIyOTY4NmNkMGM1MDNhNCIsInVzZXJfaWQiOjF9.KekqTaXXLoO_a8zH51zwUlAS3I4mWJ27yE8szbauOYA'
          }
        }
        const postResponse = await fetch(problemsUrl, fetchConfig)
        setProgress(95)
        if (!postResponse.ok) {
          throw new Error(`Request failed with status ${postResponse.status}`)
        }


        const newProblem = await postResponse.json();
        setProgress(100)
        setLoading(false)
        if (newProblem) {
          navigate('/practice/practice-list')
        }

        setTopicInput("");
        } catch(error) {
        console.error(error);
        alert(error.message);
        }
  }

  //     const capitalizedTopic =
  //       topic[0].toUpperCase() + topic.slice(1).toLowerCase();

  return (
    <>
    <section className="banner" id='home'>
      {loading ?
        <section className="loading-screen">
          <div className="d-flex flex-column justify-content-center align-items-center ">
            <Player
              autoplay
              loop
              src={brain_loader}
              style={{ height: '300px', width: '300px' }}
            />
            <h2>Generating Problems!</h2>
            <ProgressBar animated striped variant="info" now={progress} label={`${progress}%`} style={{ width: '200%' }} />
          </div>
        </section>
    :
        <Container className="curriculum-bot-main">
            <div>
                <Player
                    autoplay
                    loop
                    src={question_bot}
                    style={{ height: '300px', width: '300px' }}>
                </Player>
            </div>
          <h3 style={{ margin: 'auto', paddingTop: '10px'}}>I would like:</h3>
          <form onSubmit={onSubmit}>
            <div className="practice-input">
                <input
                    type="number"
                    name="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    style={{width:'fit-content', marginTop: '20px'}}
                />
                <label htmlFor="number">questions, on the topic of </label>
                <input
                    type="text"
                    name="topic"
                    placeholder="Enter a topic"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    style={{width:'fit-content'}}
                />
            </div>
            <Button type="submit" value="Generate Practice Problems" style={{marginBottom: '30px', marginTop: '10px'}}>Generate Problems!</Button>
          </form>
        </Container>}

    </section>
    <Footer />

          </>
  );
}

export default PracticeBot;
