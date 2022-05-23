import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import './App.css';
import Cards from './Component/CustomCard/customcard';
import {motion} from 'framer-motion'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TextField from '@material-ui/core/TextField';
import SkletonCard from './Component/SkletonCard/skletoncard'

function App() {

  const[images,setimages] =useState([]);
  const[search,setsearch]=useState('random');
  const [[page1,page2],setpage]=useState([0,1])
  const [ran,setran]=useState(0);
  const [loading,setloading]=useState(false);
  const caro=useRef()
  const [rightwidth,setrightwidth]=useState(0)

  useEffect(() => {
    setimages([])
    setloading(true)
     axios.get(`https://api.unsplash.com/search/photos?query=${search}&client_id=${process.env.REACT_APP_KEY}`)
    .then(function(res){
      setimages(res?.data?.results?.map((val,index)=>{
        var url=val?.urls?.regular
        var likes= val?.likes
        var download=val?.links?.download
        var first=val?.user?.first_name
        var last=  val?.user?.last_name
       return({url,likes,download,Name:(first+" "+last)})
      }))
    })

    setrightwidth(caro.current.scrollWidth-caro.current.offsetWidth)


    setTimeout(() => {
      setloading(false)
    },2000);



  }, [search,ran])
  


  const HandleNext=(e)=>{
    page2===6?setpage([0,1]):setpage([page1+1,page2+1])
    var slider = document.getElementById('slider')
    slider.scrollLeft=slider.scrollLeft+400;
  }
  
  const HandlePrev=(e)=>{
    page1===0?setpage([5,6]):setpage([page1-1,page2-1])
    var slider = document.getElementById('slider')
    slider.scrollLeft=slider.scrollLeft-400;
  }


  const handleShuffle=(e)=>{  
      setran(!ran) 
      if(ran)
      {
        setsearch('Airbus')
        
      }
      else{
        setsearch('Grass')
      }
  }


  return (
    <div className="App">
        <Grid container   direction="row" justifyContent="space-around" alignItems="center">
          <Grid item lg={4}>
            <h3 style={{fontSize:'3rem',color:'#1d85ff'}}>Gallery</h3>
          </Grid>
          <Grid item lg={2}>
            <TextField onChange={(e)=>{setsearch(e.target.value)}} id="standard-basic" label="Type your keyword.." variant="standard" />
          </Grid>
          <Grid item lg={2}>
            <Button variant='filled' style={{backgroundColor:'#c5d4de'}} onClick={handleShuffle}>{<ShuffleIcon/>}shuffle</Button>
          </Grid>
        </Grid>
        <br/>
        <div id="slider" ref={caro} style={{width:'80%',height:'60%',overflow:'scroll',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}  >
          <motion.div drag='x' dragConstraints={{left:-rightwidth,right:0}} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItem:'center'}}  >
            {images?.length!==0 && !loading? images?.map((val,index)=>{return(
              <motion.div key={index} initial={{opacity:0,x:-100}} animate={{opacity:1,x:0}} transition={{delay:.25,duration:1}} id={0} style={{width:280,height:400,margin:5}} >
                <Cards details={val}/>
              </motion.div>
            )}):
            <>       
              {[...Array(8)].map((_,ind)=>{
                return(
                  <div  style={{width:280,height:400,margin:5}}>
                    <SkletonCard/>
                  </div>
                )
              })}
            </>
            }
          </motion.div>
        </div>

        <div style={{displat:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
          <Button style={{backgroundColor:'#c5d4de',marginRight:10}} variant='filled' onClick={HandlePrev}   >{<ArrowLeftIcon/>}</Button>
          <Button style={{backgroundColor:'#c5d4de'}} variant='filled' onClick={HandleNext} >{<ArrowRightIcon/>}</Button>
        </div>



    </div>
  );
}

export default App;
