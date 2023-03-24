import { useState, useEffect } from "react"
import { Container, Row } from "react-bootstrap"
import { CurriculumCard } from "../CurriculumCard"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { Footer } from "../Footer";

function ProblemList(){
  const [problems, setProblems] = useState([])
  const user = useSelector(state => state.auth.user)


  async function loadProblems() {
    const response = await fetch('http://localhost:8000/curriculums/problems/')
    if (response.ok){
      const data = await response.json()
      setProblems(data.problems)
    } else {
      console.error(response)
    }
  }

  useEffect(() => {
    loadProblems();
  }, []);


  return(
    <>
      <section className="banner">
        <section className="curriculums" id="curriculums">
          <Container className="cards-container">
            <div className="curriculum-header">
              <Row>
                <h2>Problem Sets</h2>
                <p>Here's a list of your Problem Sets!</p>
              </Row>
            </div>
            <div className="cards">
              {
                problems.filter((problem) => problem.user === user.email).map( (problem) => {
                  return(
                      <Link key={problem.id} className="curr-imgbx" to={`/problem-set/${problem.id}`}>
                        <div className="currCard">

                            {problem.name}
                            <CurriculumCard
                              key={problem.id}
                              name = {problem.name} imgUrl={problem.imgUrl}
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
  )}

export default ProblemList
