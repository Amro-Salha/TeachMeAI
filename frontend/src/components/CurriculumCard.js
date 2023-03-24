export const CurriculumCard = ({name, imgUrl}) => {
    return (
        <>
                <img src={imgUrl} alt='Topic'/>
                <div className="curr-txtx">
                    <h2>{name}</h2>
                </div>
        </>
    )
}
