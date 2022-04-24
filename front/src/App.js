import React, { useState, useEffect } from "react"
import './App.css';

function App() {

  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch('/api/videos').then(res => res.json()).then(data => {
      let dataReverse = data.reverse()
      setVideos(dataReverse)
    })
  })
  function AddLink() {
    let value = document.getElementById("inputLink").value;
    let findValue = videos.find((i)=>{
      return i === value
    })
    if(value !== "" && findValue === undefined){
    fetch(`/${value}`).then(res => res.json()).then(data => {
      let dataReverse = data.reverse()
      setVideos(dataReverse)
    })
    
  }
  else{
    if(value === ""){
      window.alert("Adicione um ID")
    }
    else{
      window.alert("ID já adicionado")
    }
  }
  }
  function removeLink(id){
    fetch(`/delete/${id}` ,{method:"DELETE"}).then(res=>res.json()).then(data=>{
      let dataReverse = data.reverse()
      setVideos(dataReverse)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="divForm">
          <form>
            <input id="inputLink" key="AddLink" type="text" placeholder="Add Youtube video ID" ></input>
          </form>

          <button onClick={() => { AddLink() }}>Add</button>
        </div>
        {videos.map((id, index) => {
          return (
            <div className="videoDiv">
              <a key={index} href={`https://youtube.com/watch?v=${id}`}><img alt={index} src={`https://img.youtube.com/vi/${id}/0.jpg`}></img></a>
              <img  onClick={()=>{
                removeLink(id)
              }} alt={index}className="removeImg" title="Remove" src="remove.png" width="32px"></img>
            </div>
          )
        })}

      </header>
    </div>
  );
}

export default App;
