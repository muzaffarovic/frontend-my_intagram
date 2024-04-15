import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Posts from '../Posts/Posts'
import { useParams } from 'react-router-dom'
import CreatePost from '../Modals/CreatePost'
import Search from '../Search/Search'
import CommentModal from '../Modals/CommentModal'

const Main = () => {
    const {id} = useParams();
    const [showC,setShowC] = useState(false);
    const [showDriver,setShowDriver] = useState(false);
  return (
    <div style={{display:'flex'}}>
        {
            showC ? <CreatePost setShowC={setShowC} showC={showC} id={id} />: null
        }
        {
            setShowDriver ? <Search setShowDriver ={setShowDriver} showDriver={showDriver} id={id} />: null
        }
        <Navbar setShowC={setShowC} id={id} setShowDriver={setShowDriver}/>
        <Posts id={id}/>
    </div>
  )
}

export default Main