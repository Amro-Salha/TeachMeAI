import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ProblemDetail() {
    const [problems, setProblem] = useState()
    const { id } = useParams()


    async function loadProblems() {
        const url = `http://localhost:8000/curriculums/problems/${id}/`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setProblem(data.problems)
        } else {
            console.error(response)
        }
    }

    useEffect(() => {
        loadProblems();
    })

    if (!problems) {
        return <div>Loading...</div>
    }

    const response = problems
    const html = response.replace(/"/g, '');



    return (
        <>
        <section  className="banner">
            <Container className="resultTable">
        <div style={{ padding: "50px"}} dangerouslySetInnerHTML={{ __html: html }}>
        </div>
        </Container>
        </section>
        </>
    )

}

export default ProblemDetail
