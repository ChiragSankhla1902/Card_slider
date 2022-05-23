import * as React from 'react';
import './Skelton.css'
export default function SkletonCard() {

  return (

        <div style={{display:'flex',backgroundColor:'#fff',margin:5}}>
            <div style={{width:345}}>
                <div style={{width:300,height:100}} className='skel'> 

                </div>
                <div style={{width:300,height:50,marginTop:2,marginBottom:2}} className='skel'>

                </div>
                <div style={{width:300,height:50}} className='skel'> 

                </div>
            </div>
        </div>


  );
}
