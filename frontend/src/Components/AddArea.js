import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function AddArea(){

    const[cities,setCities]=useState([]);
    const [state,setState]=useState([]);
    const [city,setCity]=useState([]);

    const [data,setData] = useState({
        areaName:""
    });


    const navigate=useNavigate();

    const changeHandler = (e) => {
        setData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
        console.log(e.target.value)
    }

    const refreshPage = (e) => {
        window.location.reload();
    };

    useEffect(() => {   
    },[]);

    const submitData=()=>{

    }

    
    const cityFetch=(e)=>{
    }

    const oneCity=(e)=>{
    }

    const logout=()=>{
        sessionStorage.removeItem("admin");
        navigate("/");
    }
    
    return(
        <div className="container-fluid">
            <button className="btn btn-primary" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button> 
            <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/admin")}>Go Back</button>
            <h2> Add New Area</h2>
            <form>
        <div style={{ marginTop: '10px' }} className = "form-group">
            <label><b> Select State and City: </b></label>
                
                 <select style={{ marginLeft: '10px' }} name="state" onChange={cityFetch}>
                    <option value="0" >--state--</option>
                    {
                        state.map((v)=>{
                        return (
                            <option key={v.stateId} value={v.stateId} >{v.stateName}</option>
                        )})
                    }
                </select>
                
               <select style={{ marginLeft: '10px' }} name="cityId" value={data.cityId} onChange={oneCity}>
                    <option value="0" >--city--</option>
                     {
                        cities.map((v)=>{
                        return (
                            <option key={v.cityId} value={v.cityId} >{v.cityName}</option>
                        )})
                    } 
                </select>

                <div className = "form-group">
                <label><b> Area Name: </b></label>
                <input type="text" placeholder="Enter Area Name" name="areaName" className="form-control" 
                    value={data.areaName} onChange={changeHandler}/>
             </div>
                
             <div style={{marginTop: "10px", marginLeft:"240px"}}>
            <button className="btn btn-success" onClick={submitData}>Add Area</button>
            <button type="button" className="btn btn-danger" style={{marginLeft: "10px"}} onClick={ refreshPage}>Reset</button>
            <button className="btn btn-danger" onClick={() => navigate("/admin")} style={{marginLeft: "10px"}}>Cancel</button> 
            
            </div>
        </div>
        </form>
        </div>
    );
}

export default AddArea;