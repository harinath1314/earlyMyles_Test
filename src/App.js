import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],

    }
  }
  async componentDidMount() {
    var optimisedData = []
    var albums;
    var photos;
    await axios.get("https://jsonplaceholder.typicode.com/albums").then((res) => {
      albums = res.data
    })

    await axios.get("https://jsonplaceholder.typicode.com/photos").then((res) => {
      photos = res.data;
    })


    for (let i = 0; i < albums.length; i++) {
      const element = albums[i];
      var tempArray = []
      for (let j = 0; j < photos.length; j++) {
        let tempObj = {};
        const photo = photos[j];
        if (element["id"] == photo["albumId"]) {
          tempObj["title"] = element.title;
          tempObj[element.title] = photos[j]
          tempArray.push(tempObj)
        }

      }
      optimisedData.push(tempArray);

    }

    this.setState({ photos: optimisedData })

  }
  render() {
    return (
      <div style={{position:"relative"}}>
        {this.state.photos.map((item, key) => (
          <div>
            <p style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"self-start", padding:"8px",width:"375px", height:"48px", left:"0px",font:"Inter",fontWeight: "600" }} >{item[0].title} </p>

            {item.map((album, key) => (
              <div style= {{position:"relative",display:"flex",alignItems:"center", borderRadius:"24px", backgroundColor:"#FCFCFC", width:"336px",height:"89px",marginBottom:"12px",border:"1px solid #ccc",textOverflow:"ellipsis", padding:"12px"}}>
                <img style={{width:"60px", height:"60px", borderRadius:"16px", marginRight:"8px",}} src={album[album.title].url}></img>
                <span style={{justifyContent:"space-between", display:"flex",flexDirection:"column"}}>
                <span> {album[album.title].id} </span>
                <span> {album[album.title].title} </span>
                </span>
              </div>

            ))}
          </div>



        ))}

      </div>
    )
  }
}
