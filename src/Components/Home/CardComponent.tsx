import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
// import '../App.css'
import "./home.css"
import { motion, useScroll, Variants } from 'motion/react'
import { GiPokerHand } from "react-icons/gi";
import { Button } from 'react-bootstrap';
import { desc, div } from 'motion/react-client';

export const CardComponent:React.FC = () => { 
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
      
      const card: [string, number, number, number][] = [
        ["Features", 340, 10, 80],
        ["Robust Login System", 20, 40, 50],
        ["Secure Login Using JWT", 60, 90, 50],
        ["Playing music via youtube", 80, 120, 50],
        ["Custom Playlist Creation", 100, 140, 50],
        ["Roulette Song Playing (Play Random Songs)", 205, 245, 45],
      ];
    
    
    
    return(
        <>
        
          <div className='cardDiv'>
            {card.map(([desc, hueA, hueB, textSize]) => (
            <Card desc={desc} hueA={hueA} hueB={hueB} key={desc} textSize={textSize} />))}
          </div>

        </>
    )
}