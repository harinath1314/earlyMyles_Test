import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAlbums } from './Redux/Actions/actions';
import { getPhotos } from './Redux/Actions/actions';
import { Albums } from './Redux/TextConstants';
import * as actions from './Redux/Actions/actions';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums :[],
      photos :[]

    }
  }
  async componentDidMount() {
    
    
    this.props.getAlbums();
    this.props.getPhotos();

    

  }

  render() {
    console.log("this.state.photos", this.props.photos)
    return (
      <div style={{position:"relative"}}>
        {this.props.photos.map((item, key) => (
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

const mapStateToProps = (state) => {

  var optimisedData = [];
  if(state.GetAlbumsPhotos.Albums.length >0){
    var albums  = state.GetAlbumsPhotos.Albums;
    
  var photos = state.GetAlbumsPhotos.Photos;
  console.log("photos --->", photos)
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

  
console.log("optimisedData", optimisedData)
  

}
console.log("optimisedData2", optimisedData)
return { albums: state.GetAlbumsPhotos.Albums, photos: optimisedData, }
};

export default connect(mapStateToProps, actions)(App)

