import { useState, useEffect } from "react"
import { Container, Row } from "react-bootstrap"
import { CurriculumCard } from "./CurriculumCard"
import {Link} from "react-router-dom"
import { useSelector } from "react-redux";
import { Footer } from "./Footer";

function CurriculumList(){
  const [curriculums, setCurriculums] = useState([])
  const user = useSelector(state => state.auth.user)

  async function loadCurriculums() {
    const response = await fetch('http://localhost:8000/curriculums/memory/')
    if (response.ok){
      const data = await response.json()
      setCurriculums(data.curriculums)
    } else {
      console.error(response)
    }
  }

  useEffect(() => {
    loadCurriculums();
  }, []);


  return(
    <>
    <section className="banner">
      <section className="curriculums" id="curriculums">
        <Container className="cards-container">
          <div className="curriculum-header">
            <Row>
              <h2>Curriculums</h2>
              <p>Here's a list of your curriculums!</p>
            </Row>
          </div>
          <div className="cards">
            {
              curriculums.filter(( curriculum ) => curriculum.user === user.email).map( (curriculum) => {
                return(
                    <Link key={curriculum.id} className="curr-imgbx" to={`/curriculums/${curriculum.id}`}>
                      <div className="currCard">

                          {curriculum.name}
                          <CurriculumCard
                            key={curriculum.id}
                            name = {curriculum.name} imgUrl={curriculum.imgUrl}
                          />
                      </div>
                  </Link>
                )
              })
            }
          </div>

        </Container>
        <Footer />
      </section>
    </section>

    </>
    )  }

export default CurriculumList
