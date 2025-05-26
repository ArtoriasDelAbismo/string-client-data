import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Home() {
  return (
    <>
    <Navbar />
        <h1>Tierra Database</h1>
        <div style={{display:'flex', justifyContent:'center', gap:'10px'}}>
            <div>
                <Link style={{width:'100px', height:'50px', border:'1px solid', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}} to={'/strings'}>Strings</Link>
            </div>
            <div>
                <Link style={{width:'100px', height:'50px', border:'1px solid', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}} to={'/workshop'}>Workshop</Link>
            </div>

        </div>
      <Footer />
    
    </>

  )
}
