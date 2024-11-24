import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
// import '../App.css'
import "./home.css"
import { motion, useScroll, Variants } from 'motion/react'
import { GiPokerHand } from "react-icons/gi";
import { Button } from 'react-bootstrap';
function Home() {
  const [count, setCount] = useState(0)

  interface Props {
    desc: string;
    hueA: number;
    hueB: number;
    textSize: number

  }
  
  const cardVariants: Variants = {
    offscreen: {
      y: 300
    },
    onscreen: {
      y: 50,
      rotate: -10,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };
  
  const hue = (h: number) => `hsl(${h}, 100%, 50%)`;
  
  function Card({desc, hueA, hueB, textSize}: Props) {
    const background = ` linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;
  
    return (
      <motion.div
        className="card-container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <div className="splash" style={{ background }} />
        <motion.div className="card" variants={cardVariants} style={{fontSize:`${textSize}px`}} >
          {desc}
        </motion.div>
      </motion.div>
    );
  }
  
  const food: [string, number, number, number][] = [
    ["Features", 340, 10, 80],
    ["Robust Login System", 20, 40, 50],
    ["Secure Login Using JWT", 60, 90, 50],
    ["Playing music via youtube", 80, 120, 50],
    ["Custom Playlist Creation", 100, 140, 50],
    ["Roulette Song Playing (Play Random Songs)", 205, 245, 45],
  ];


  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}


{/* <div className='logo'>
<GiPokerHand size={"50px"} className='wow'/>
<p className='wow'>all in audio</p>

</div> */}

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='root'>
        <div>
          <GiPokerHand size={"188px"}/>
          <h1>All in Audio</h1>
          <p>We go all in for your audio and music experience</p>
            
          <motion.div className='test'   
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}>
          <Button  variant="success">
              Get Started
          </Button>
          </motion.div>
        </div>
        
        <div>
          <div className='hide' style={{ height: '400px', width: '500px', overflow: 'auto'}}>
            {food.map(([desc, hueA, hueB, textSize]) => (
            <Card desc={desc} hueA={hueA} hueB={hueB} key={desc} textSize={textSize} />))}
          </div>
        </div>
      </motion.div>


    </>
  )
}

export default Home
