 
 import { getAlbumUrl , getPhotosUrl, Albums, Photos} from "../TextConstants.js";
 import Axios from 'axios';
 

 export const getAlbums = () => {
  return async (dispatch) => {
      const res = await Axios({
          url: getAlbumUrl,
          method: 'get',
      })
      dispatch({
          type: Albums,
          payload: res.data
      })
      return res
  }
}




export const getPhotos = data => {
  return async dispatch => {
    const res = await Axios({
      url: getPhotosUrl ,
      method: "GET",

    }).then((res)=>{
        dispatch({
            type: Photos,
            payload: res.data
          });
          return res.data;
    }
    ).catch((res)=>{
        dispatch({
            type: Albums,
            payload: "no Photos"
          });
    });
    
    
  };
};