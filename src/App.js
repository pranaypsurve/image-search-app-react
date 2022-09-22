import React,{useEffect, useState} from "react";
import axios from "axios";
import { Pagination } from "antd";
function App() {
  const [searchPhoto,setsearchPhoto] = useState('');
  const [searchResults,setsearchResults] = useState([]);
  const [imageOrientation,setImageOrientation] = useState('landscape');
  
  const [total,setTotal] = useState('');
  const [page,setpage] = useState(1);
  const [imagePerPage,setImagePerPage] = useState(10);

  useEffect(()=>{
    axios.get(`https://api.unsplash.com/search/photos?page=${page}&per_page=${imagePerPage}&query=${searchPhoto}&orientation=${imageOrientation}&client_id=${process.env.REACT_APP_UNSPLASH_SECRET_KEY}`)
    .then((data)=>{
      setsearchResults(data.data.results);
    },(error)=>{
      console.log('error',error.message);
    })
  },[page,imagePerPage]);
  const handleInput = (e)=>{
    setsearchPhoto(e.target.value);
  }
  const handleSubmit = (e)=>{
    
    axios.get(`https://api.unsplash.com/search/photos?page=${page}&per_page=${imagePerPage}&query=${searchPhoto}&orientation=${imageOrientation}&client_id=${process.env.REACT_APP_UNSPLASH_SECRET_KEY}`)
    .then((data)=>{
      setsearchResults(data.data.results);
      setTotal(data.data.total);
      // console.log(data)
    },(error)=>{
      console.log(error)
    })
  }
  const changeOrientation = (e)=>{
    setImageOrientation(e.target.value);
  }
  const indexOfLastPage = page + imagePerPage;
  const indexOfFirstPage = indexOfLastPage - imagePerPage;
  const currentPage = searchResults.slice(indexOfFirstPage,indexOfLastPage)

  const onShowSizeChange = (current,pageSize)=>{
    setImagePerPage(pageSize);
  }
  const itemRender = (current,type,originalElement)=>{
    if(type === 'prev'){
      return <a className="btn btn-primary text-white">Prev</a>
    }
    if(type === 'next'){
      return <a className="btn btn-primary text-white">Next</a>
    }
    return originalElement;
  }
  return (
    <section>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-12'>
          <div className="row">
            <div className='col-md-4'>
              <h3 className='text-center pt-4'>Developed by pranay surve</h3>
            </div>
            <div className='col-md-4'>
              <h2 className='text-center pt-4'>Unsplash Image Search</h2>
            </div>
            {/* <div className='col-md-4'>
              <h2 className='text-center pt-4'>{process.env.NODE_ENV}</h2>
            </div> */}
          </div>
        </div>
        <div className='col-md-12 mb-4 text-center'>
          <input type='text' value={searchPhoto} placeholder='Search Images' onChange={handleInput} className='form-control' /> <br/>
          <select defaultValue='landscape' onChange={changeOrientation} className="form-select" aria-label="App Created by pranay surve">
            <option value='landscape'>Landscape</option>
            <option value='portrait'>Portrait</option>
            <option value='squarish'>Squarish</option>
          </select><br/>
          <button className='btn btn-primary me-2' onClick={handleSubmit}>Search Image</button>
        </div>
        {
          searchResults && searchResults.map((value,index)=>{
            return <div className='col-md-4 text-center' key={value.id}>
            <img src={value.urls.thumb} className='img-fluid img-thumbnail' alt="" height="250px" width="250px" />
          </div>
          })
        }
        <div className='col-md-12 text-center pt-4 pb-4'>
          <Pagination hideOnSinglePage onChange={(value)=>{setpage(value)}} pageSize={imagePerPage} total={total} current={page} showSizeChanger showQuickJumper onShowSizeChange={onShowSizeChange} itemRender={itemRender} />
        </div>
      </div>
    </div>

    </section>
  );
}

export default App;
