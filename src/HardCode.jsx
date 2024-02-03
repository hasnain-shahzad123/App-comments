import React from 'react'
import jsonData from './data.json'
import reply from './images/icon-reply.svg'
import mg from './images/avatars/image-amyrobson.png'
import mg2 from "./images/avatars/image-maxblagun.png"
import mg3 from "./images/avatars/image-ramsesmiron.png"
import mg4 from './images/avatars/image-juliusomo.png'
import dlete from './images/icon-delete.svg'
import edt from './images/icon-edit.svg'
const HardCode = () => {
    let userName = jsonData.comments[0].user.username;
    let score = jsonData.comments[0].score;
    let content = jsonData.comments[0].content;
    let time = jsonData.comments[0].createdAt;
  return (
        
        <div>
          <div className='OldComments'>
          <div className="counter">
          <button >+</button>
          <h3>{score}</h3>
          <button>-</button>
          </div>

          <div className='CoverComent'><img src={mg} className='myImage' alt="" />
          <span>{userName} </span><button className='replyComment'  ><img src={reply}  alt="" /> Reply</button>
          <textarea  className='OldCommentsData' value={content}>
          </textarea>
          </div>
          </div>


          <div className='OldComments'>
          <div className="counter">
          <button >+</button>
          <h3>{jsonData.comments[1].score}</h3>
          <button>-</button>
          </div>

          <div className='CoverComent'><img src={mg2} className='myImage' alt="" />
          <span>{jsonData.comments[1].user.username} </span><button className='replyComment'  ><img src={reply}  alt="" /> Reply</button>
          <textarea  className='OldCommentsData' value={jsonData.comments[1].content}>
          </textarea>
          </div>
          </div>


          <div className='OldComments replyCommentBox'>
          <div className="counter">
          <button >+</button>
          <h3>{jsonData.comments[1].replies[0].score}</h3>
          <button>-</button>
          </div>

          <div className='CoverComent'><img src={mg3} className='myImage' alt="" />
          <span>{jsonData.comments[1].replies[0].user.username} </span><button className='replyComment replySectionBtn'  ><img src={reply}  alt="" /> Reply</button>
          <textarea  className='OldCommentsData' value={jsonData.comments[1].replies[0].content}>
          </textarea>
          </div>
          </div>



          <div className='OldComments replyCommentBox'>
          <div className="counter">
          <button >+</button>
          <h3>{jsonData.comments[1].replies[1].score}</h3>
          <button>-</button>
          </div>

          <div className='CoverComent'><img src={mg4} className='myImage' alt="" />
          <span>{jsonData.comments[1].replies[1].user.username} </span><button className='Delete'><img src={dlete} alt="" /> Delete</button>
          <button className={`replyComment editReply ${v.repl}`}
          ><img src={edt}  alt="" /> Edit</button>
          <textarea  className='OldCommentsData' value={jsonData.comments[1].replies[1].content}>
          </textarea>
          </div>
          </div>


      </div>

      
      
  )
}
export default HardCode