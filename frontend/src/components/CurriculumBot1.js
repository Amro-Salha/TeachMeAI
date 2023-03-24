import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/img/logo.png'
import { Container, ProgressBar, Button } from "react-bootstrap"
import { Player } from '@lottiefiles/react-lottie-player'
import brain_loader from "../assets/loading/brain_loader.json"
import { useSelector } from "react-redux";
import { Footer } from "./Footer";


function CurriculumBot1Home() {
  const [topicInput, setTopicInput] = useState("");
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const MY_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const PIC_KEY = process.env.REACT_APP_UNSPLASH_API_KEY


  async function onSubmit(event) {
        event.preventDefault();

        try{
          const response = await fetch('http://localhost:8000/curriculums/memory/')
          if (response.ok){
            const data = await response.json()

          for (let curriculum of data.curriculums) {
            if (curriculum.name === topicInput){
              const curriculumsUrl = 'http://localhost:8000/curriculums/memory/'
              const fetchConfig =
              {
                method: 'POST',
                body: JSON.stringify({ user: user, name: topicInput, curriculum: curriculum.curriculum , imgUrl: curriculum.imgUrl }),
                headers: {
                  'Content-type': 'text/html',
                  'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5MTY0ODIyLCJqdGkiOiIzMmNiYThlYjA2ZjI0YTkyOTIyOTY4NmNkMGM1MDNhNCIsInVzZXJfaWQiOjF9.KekqTaXXLoO_a8zH51zwUlAS3I4mWJ27yE8szbauOYA'
                }
              }

              const postResponse = await fetch(curriculumsUrl, fetchConfig)
              setProgress(95)
              if (!postResponse.ok) {
                throw new Error(`Request failed with status ${postResponse.status}`)
              }


              const newCurriculum = await postResponse.json();
              setProgress(100)
              setLoading(false)
              if (newCurriculum) {
                navigate('/curriculums/curriculum-list')
              }
            }

            }
          }

        } catch (error) {
          console.error(error);
          alert(error.message);
        }


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
                prompt: `Using HTML, create 3 tables with the following headers. Each table will have 2 columns:

                1. Curriculum: Divide the topic of learning the basics of ${topicInput} into 7 sections. In the second column, provide a link to a Udemy search of that section name with the price filter set to free. The URL should follow this template: https://www.udemy.com/courses/search/?price=price-free&q=(SECTION NAME HERE)y&sort=relevance&src=ukw where (SECTION NAME HERE) is replaced with the section name in url format. Let the display for that hyperlink say "Click here to learn!". The second column should not have a header.

                2. Practice Problems: Column 1 will have a row for each section name, column 2 should have a 5 question quiz for each section. The second column should not have a header.

                3. Answers: Provide the answers to the questions. The second column should not have a header.

                Provide your response in HTML format as it will be displayed in a <div> tag on a separate site.`,
                temperature: 0.3,
                max_tokens: 3800
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

        const curriculumsUrl = 'http://localhost:8000/curriculums/memory/'
        const fetchConfig =
        {
          method: 'POST',
          body: JSON.stringify({user: user, name: topicInput, curriculum: html, imgUrl: imgData.results[1].urls.small}),
          headers: {
            'Content-type': 'text/html',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5MTY0ODIyLCJqdGkiOiIzMmNiYThlYjA2ZjI0YTkyOTIyOTY4NmNkMGM1MDNhNCIsInVzZXJfaWQiOjF9.KekqTaXXLoO_a8zH51zwUlAS3I4mWJ27yE8szbauOYA'
          }
        }

        const postResponse = await fetch(curriculumsUrl, fetchConfig)
        setProgress(95)
        if (!postResponse.ok) {
          throw new Error(`Request failed with status ${postResponse.status}`)
        }


        const newCurriculum = await postResponse.json();
        setProgress(100)
        setLoading(false)
        if (newCurriculum) {
          navigate('/curriculums/curriculum-list')
        }

        setTopicInput("");
        } catch(error) {
        console.error(error);
        alert(error.message);
        }
  }

  return (
    <>
    <section className="banner">
      {loading ?
        <section className="loading-screen">
          <div className="d-flex flex-column justify-content-center align-items-center ">
            <Player
              autoplay
              loop
              src={brain_loader}
              style={{ height: '300px', width: '300px' }}
            />
            <h2>Generating curriculum!</h2>
            <ProgressBar animated striped variant="info" now={progress} label={`${progress}%`} style={{ width: '200%' }} />
          </div>
        </section>
    :
        <Container className="curriculum-bot-main">
          <img className="logo" src={logo} alt="Logo" />
          <h3 style={{ margin: 'auto'}}>I would like to learn:</h3>
          <form onSubmit={onSubmit}>
            <input
                type="text"
                name="topic"
                placeholder="Enter a topic"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                style={{width:'100%', marginTop: '-50px'}}
            />
            <Button type="submit" value="Generate curriculum" style={{marginBottom: '25px', marginTop: '10px'}}>Generate Curriculum!</Button>
          </form>
        </Container>}

    </section>
    <Footer />
    </>
  );
}

export default CurriculumBot1Home;
