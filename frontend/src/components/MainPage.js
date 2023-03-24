import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Banner } from "./Banner";
import { BotInfo } from "./BotInfo";
import { Footer } from './Footer';


function MainPage() {
  return (
    <>
      <Banner />
      <BotInfo />
      <Footer />
    </>
  )
}

export default MainPage;
