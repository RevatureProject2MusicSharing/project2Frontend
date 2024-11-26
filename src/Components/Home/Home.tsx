import "./home.css"
import { motion, useScroll, Variants } from 'motion/react'
import { GiPokerHand } from "react-icons/gi";
import { Button } from 'react-bootstrap';
import { CardComponent } from './CardComponent';
import { useNavigate } from 'react-router-dom';
export function Home() {
  const navigate = useNavigate()
  return (
    <>

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='root'>
        <div>
          <GiPokerHand size={"188px"}/>
          <h1>All in Audio</h1>
          <p>We go all in for your audio and music experience</p>
            
          <motion.div className='test'   
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}>
          <Button  variant="success" onClick={()=>navigate("/login")} >
              Get Started
          </Button>
          </motion.div>
        </div>
        
        <div>
          <CardComponent></CardComponent>
        </div>
      </motion.div>


    </>
  )
}