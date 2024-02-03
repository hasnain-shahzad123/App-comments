import React, { useRef, useState } from 'react'
import personelImage from './images/avatars/image-juliusomo.webp'
import reply from './images/icon-reply.svg'
import dlete from './images/icon-delete.svg'
import edt from './images/icon-edit.svg'
import mg from './images/avatars/image-amyrobson.png'
import mg2 from "./images/avatars/image-maxblagun.png"
//import HardCode from './HardCode'
import jsonData from './data.json'
import './index.css'
const App = () => {
  const classRef = useRef(null);
  const popRef = useRef(null)
  const SmartPhone = useRef(null);
  const [Uservalue,SetValue]=useState({
    idx:0,
    data:'',
    i:0,
  });
  const [placeholder,setPlaceHolder]=useState('Add a Comment...');
  const [userArray,SetUserArray]=useState([
    {id:1,userImg:mg,userData:jsonData.comments[0].content,likes:jsonData.comments[0].score,
    editComment:false},{id:2,userImg:mg2,
      userData:jsonData.comments[1].content,likes:jsonData.comments[1].score,
      editComment:false,
    }
  ]);
 
  function ShowOutput(index=0,id=1){
    let v=Uservalue.data;
    console.log("yeah")
    if(v===""){
        alert("please enter some message");
    }
     else if(id===2){
          SetUserArray((prevData) => {
          const newArray = [...prevData];
          newArray.splice(index+1, 0, {id:3,userImg:personelImage , userData:v, likes: 0, editComment:true,replyComment:true });
          console.log(newArray);
          return newArray;
      });
      }
      else{
      SetUserArray((prevData)=>{
      return  [...prevData,{id:3,userImg:personelImage ,userData:v , likes: 0, editComment:true,replyComment:false}];
      })
      }
      SetValue((prevData)=>({
        ...prevData,
        data:'',
      }));
      
  }
  function DeleteComment(index){
    // alert('heelll')
    classRef.current.classList.add('overlay');
    popRef.current.classList.add('popUP')
    Uservalue.i=index;
  }
  function IncreaseLikes(index) {
    SetUserArray((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], likes: newData[index].likes + 1 };
      return newData;
    });
  }
  function increaseCount(){
    c=c+1;
  }
  function DecreaseLikes(index){

    SetUserArray((prevData) => {
      const newData = [...prevData];
      if(newData[index].likes>0)
      newData[index] = {...newData[index],likes:newData[index].likes-1}
      return newData;
    });
  }
  function cencelDeletion(){
    classRef.current.classList.remove('overlay');
    popRef.current.classList.remove('popUP')
    
  }
  function textAreaFocused(){
   SmartPhone.current.classList.add('SmartDevice');
  }
  function textAreaBlur(){
    setTimeout(() => {
      SmartPhone.current.classList.remove('SmartDevice')
    },100);
   
  }
  function confirmDeletion(){
    classRef.current.classList.remove('overlay');
    popRef.current.classList.remove('popUP')
    SetUserArray((prev)=>{
      const newArray = [...prev];
      newArray.splice(Uservalue.i,1);
      return newArray;
    })
  }
  function handleClick(index=0){
    if(placeholder==='Add your Reply...'){
      setPlaceHolder('Add a Comment...');
      console.log(Uservalue.idx);
      ShowOutput(Uservalue.idx,2);
    }
    else{
      SetValue((prevData)=>({
          ...prevData,
          idx:index,
      }))
      setPlaceHolder('Add your Reply...');
    }
  }
  function getThis(index,e){
    SetUserArray((prevData) => {
      const newArray = [...prevData];
      newArray[index] = { ...newArray[index], editComment: !newArray[index].editComment};
      return newArray;
    });
  }
  function SendDone(index){
    SetUserArray((prevData)=>{
      const newArray = [...prevData];
      newArray[index]={...newArray[index],editComment:!newArray[index].editComment}
      return newArray;
    })
  }

  let c=0;
  return (
    <>
    <div ref={classRef} className='psudoClass'>
      <div ref={popRef}>
        <h5>Delete Comment</h5>
        <p>Are you sure you want to delete this comment?
        This will remove the comment and can't be undone.</p>
        <div>
        <button className='NoCncl' onClick={cencelDeletion}>NO, CANCEL</button>
        <button className='yesDel' onClick={confirmDeletion}>YES, DELETE</button>
        </div>
      </div>
    </div>
    <div className="totalBox" >
      <div className="holdComments" ref={SmartPhone}>
      {/* <HardCode/> */}
        {userArray.map((v,index) => ( 
          <div className={`OldComments ${v.replyComment ? 'replyCommentBox' : ''}`} key={index}>
          <div className="counter">
          <button onClick={()=>IncreaseLikes(index)}>+</button>
          <h3>{v.likes}</h3>
          <button onClick={()=>DecreaseLikes(index)}>-</button>
          </div>

          { v.id!=3 ?(
          <div className='CoverComent'><img src={v.userImg} className='myImage' alt="" />
          <span>{jsonData.comments[c].user.username} </span><button className='replyComment'   onClick={()=>handleClick(index)}><img src={reply}  alt="" /> Reply</button>
          <textarea  className='OldCommentsData' value={jsonData.comments[c].content}>
          </textarea>
          {increaseCount()}
          </div>
          )
          
          :(<div className='CoverComent'><img src={v.userImg} className='myImage' alt="" />
          <span>{jsonData.currentUser.username} </span>
          <button className='Delete_btn' onClick={()=>{DeleteComment(index)}}><img src={dlete} alt="" /> Delete</button>
          <button onClick={()=>{getThis(index)}}  className={`replyComment editReply`}  
          ><img src={edt}   alt="" /> Edit</button>
          <textarea readOnly={v.editComment} className={`OldCommentsData ${userArray[index].editComment?'':"addSend"} $`} 
          value={v.userData}
          onChange={(e)=>{
            if(!v.editComment){
              SetUserArray((prevData) => {
              const newArray = [...prevData];
              newArray[index] = { ...newArray[index], userData: e.target.value };
              return newArray;
          });
            }
          }}>
          </textarea>
          <button onClick={()=>SendDone(index)} className={`replyButton ${userArray[index].editComment?'':"addSendBtn"}`}>SEND</button>
          </div>)}
          </div>
        ))}
      </div>
      <div className="CommentSection">
        <div className="myPicture">
          <img src={personelImage} alt="" />
          
        </div>

        <div className='PlaceComment'>
       
        <textarea name="" id="" cols="30" value={Uservalue.data} 
        onChange={(e)=>SetValue((prevData)=>({
          ...prevData,
          data:e.target.value
        }))} rows="10" placeholder={placeholder}
        onFocus={textAreaFocused}
        onBlur={textAreaBlur}>
        
        </textarea>
        </div>

        <div className="SendBtn">
          <button onClick={() => {
        if (placeholder==='Add a Comment...') {
          ShowOutput();
        }else {
          handleClick();
        }
}}>SEND</button>
        </div>

      </div>

    </div>
    </>
  )
}
export default App;