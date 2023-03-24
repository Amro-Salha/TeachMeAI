import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function CurriculumDetail() {
    const [curriculum, setCurriculum] = useState()
    const { id } = useParams()

    async function loadCurriculum() {
        const url = `http://localhost:8000/curriculums/${id}/`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setCurriculum(data.curriculum)
        } else {
            console.error(response)
        }
    }

    useEffect(() => {
        loadCurriculum();
    })

    if (!curriculum) {
        return <div>Loading...</div>
    }

    const response = curriculum
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

export default CurriculumDetail
