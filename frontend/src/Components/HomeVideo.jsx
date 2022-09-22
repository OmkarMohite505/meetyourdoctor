import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from '../service/Constant'


const HomeVideo = () => {
    const [imgFlag, setImgflag] = useState(false);
    const [videoFile, setVideoFile] = useState();
    const [token, setToken] = useState();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setVideoFile(event.target.files[0]);
        setImgflag(true);
        console.log(videoFile);
    }

    useEffect(() => {
        let admin = JSON.parse(sessionStorage.getItem("admin"));
        console.log(admin);
        setToken(admin.jwt);
    }, [])

    const uploadImage = (e) => {

        swal({
            title: "Are you Confirm to Upload Video?",
            text: "Image Will be uploaded and new Home UI video will change!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((upload)=>{
            if(upload){
                const formData = new FormData();
                formData.append('videoFile', videoFile)  //1st argumet 'videoFile' name must be matches with spring-boot requeat param name MultipartFile imageFile
        
                const form = new FormData();
                form.append("videoFile", videoFile);
                const options = {
                    method: 'POST',
                    url: `${IP_ADDRS}/api/admin/upload_home_video`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                    },
                    data: form
                };
        
                axios.request(options).then(response => {
                    swal(`${response.data}`,"", "success");
                    navigate(`/admin`);
                    
                }).catch(error => {
                    swal("Something went Wrong", "error");
                });
            }
        })




      




    }
    return (
        <div style={{ "marginLeft": "100px", "marginTop": "50px" }}>
            <Link to={`/admin`}><button className="btn btn-danger">Go TO Home Page</button></Link><br /><br />
            <input type="file" onChange={handleChange} name="file"></input><br /><br />
            {/* <video controls style={{"width":"900px","height":"500px"}}>
                <source src={`${IP_ADDRS}/api/image/home_video`}/>
            </video> */}
            {/* <video src={`${IP_ADDRS}/api/image/home_video`} autoPlay style={{"width":"200px","height":"200px"}}></video> */}

            <a href={`${IP_ADDRS}/api/image/home_video`} download>Click to download Video</a>
            <button style={{ "background": "red", "fontSize": "30px", "borderRadius": "10px", "cursor": "pointer" }} onClick={uploadImage}>Upload</button>
        </div>
    )
}
export default HomeVideo;