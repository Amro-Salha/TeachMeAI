import { useState} from "react";
import { Container, Button } from "react-bootstrap"
import { Player } from '@lottiefiles/react-lottie-player'
import typing from '/Users/amrosalha/Desktop/personal projects/TeachMe/my-app/frontend/src/assets/loading/typing.json'
import logo  from '/Users/amrosalha/Desktop/personal projects/TeachMe/my-app/frontend/src/assets/img/logo.png'
import hint_bot from "/Users/amrosalha/Desktop/personal projects/TeachMe/my-app/frontend/src/assets/loading/hint_bot.json"

export const HintBot = () => {
    const [counter, setCounter] = useState(0)
    const [userInput, setUserInput] = useState('')
    const [messages, setMessages] = useState([
        {role: "system", content: `You are a helpful and motivational assistant that
        will recieve questions and ONLY return hints that will lead the user to the answer.
        Never reveal the answer unless explecitly asked to via a prompt saying: Reveal the answer`},
        {role: "user", content: "I'd like to ask a question."},
        {role: "assistant", content: "Please ask me anything you'd like!"},
        {role: "user", content: "2x + 5 = 13, what does x equal?"},
        {role: "assistant", content: "Happy to help!, think about the order of operations, you need to isolate the variable in order to solve!"},
        {role: "user", content: "Can I get another hint?"},
        {role: "assistant", content: "Sure! Think about PEMDAS when isolating the variable; remove addition by subtracting, and remove multiplication by dividing!"},
        {role: "user", content: "Reveal the answer"},
        {role: "assistant", content: "The answer is: x = 4. First I subtracted 5 from 13, which gave left me with 2x = 8. I then divided by 2 on each side, which resulted in the answer: x=4"},
        {role: "user", content: "I'd like to ask a question."},
    ])
    const [loading, setLoading] = useState(false)
    const MY_KEY = process.env.REACT_APP_OPENAI_API_KEY;


    const updateChat = (messages, role, content) => {
        const newMessage = {role,content}
        const newMessages = [...messages, newMessage]
        setMessages(newMessages)
    }

    
    async function onSubmit(event) {
        event.preventDefault();
        setLoading(true)
        setUserInput('')
        setCounter(1);
        const newMessage = { role: "user", content: "Remember, I only want a hit for this question, Don't tell me the answer unless i say to reveal the answer : " + userInput };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        const response = await getAssistantResponse(newMessages);
        setLoading(false)
        updateChat(newMessages, "assistant", response);
      }


    const getAssistantResponse =  async (messages) => {
        try {
            const url = "https://api.openai.com/v1/chat/completions"
            const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `${MY_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                temperature: 0.3,
            }),
        });
        const completion = await response.json();
        const reply = (completion.choices[0].message.content)
        return(
            reply
        )


        } catch(error) {
        console.error(error);
        alert(error.message);
        }

    }

    return (
        <>
        <section className='banner' id="home">
            {counter === 0 ?
            <Container className="hint-bot-main">
                    <div>
                        <Player
                            autoplay
                            loop
                            src={hint_bot}
                            style={{ height: '300px', width: '300px' }}>
                        </Player>
                    </div>
                    <p>Welcome to Hint Bot!</p>
                    <p>Click the button below to get help on a question!</p>
                    <p>Simply ask for the answer when you no longer want hints!</p>
                    <form onSubmit={onSubmit}>
                        <Button type="submit" value="Generate Hints" className="mx-auto" style={{ marginBottom:"50px" }}>I want some help!</Button>
                    </form>
            </Container>
            :
            <div className="wrapper">
            <Container fluid className="chatBox">
                <div>
                    {messages.slice(11).map((message, index) => (

                    <div style={{ width : '100%'}} key={index}>
                        {message.role === 'user' ? <p className="user">{message.content.slice(107)}</p>
                        :
                        <p className="assistant"> <div className="typing"> <img className='avatar' alt='avatar' src={logo}/> { loading ? <Player className='player' autoplay loop src={typing} style={{ width: '40px' }} /> : <p></p>} </div> {message.content}  </p> }
                    </div>
                    ))}
                </div>
            </Container>

            <Container className="userInput">
            <form onSubmit={onSubmit}>
            <input
                    type="text"
                    name="question"
                    placeholder="Ask a question!"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    style={{ justifyContent: 'center', width: '100%', marginTop: '10px'}}
                />
                <Button variant='primary' disabled={loading} onClick={!loading ? onSubmit : null} type="submit" value="Submit" className="mx-auto" style={{ justifyContent: 'center', width: '100%', marginTop: '10px', height: '30px'}}> {loading ? 'Loading...' : 'Send'}</Button>
            </form>
            </Container>
            </div>
            }
        </section>
        </>
    );
}
