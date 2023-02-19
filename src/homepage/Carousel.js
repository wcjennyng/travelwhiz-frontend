import { useContext } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button'
import UserContext from '../auth/UserContext'
import './Carousel.css'

//Carousel for homepage 

const HomepageCarousel = () => {
    const { currentUser } = useContext(UserContext)
    return (
        <>
        <div className="carousel">
        <Carousel >
            <Carousel.Item interval={3000}>
                <img
                    className=" w-100"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7U4lLYaGvIYuz36VfP-scqdt1HJazaIdtcA&usqp=CAU"
                    style={{ height: '250px', opacity: '0.5' }}
                />
                <Carousel.Caption style={{ color: 'white' }}>
                <h1 style={{textShadow: "3px 3px black"}}>TravelWhiz</h1>    
                    <p style={{fontFamily: "Fuzzy Bubbles", fontSize: "20px"}}>The site where you can share your travel locations with friends and family.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-100 "
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7U4lLYaGvIYuz36VfP-scqdt1HJazaIdtcA&usqp=CAU"
                    alt="Second slide"
                    style={{ height: '250px', opacity: '0.5' }}
                />
                <Carousel.Caption style={{ color: 'white' }}>
                    <p style={{fontFamily: "Fuzzy Bubbles", fontSize: "20px"}}>You can also favorite other members pins and edit your own!</p>
                    <h3>Take a look <a href="/saved" style={{ color: "white", fontFamily: "Pacifico", fontSize: "35px" }}>here</a>!</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-100 "
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7U4lLYaGvIYuz36VfP-scqdt1HJazaIdtcA&usqp=CAU"
                    alt="Third slide"
                    style={{ height: '250px', opacity: '0.5' }}
                />
                <Carousel.Caption style={{ color: 'white' }}>
                    <h3>Let's get started.</h3>
                    <p>
                        <Button href="/map">Go to Map</Button>

                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        
        </div>

        <h2 className="greeting">Welcome, <b>{currentUser.firstName || currentUser.username}</b>!</h2>
        </>
    );
}

export default HomepageCarousel;