import React from 'react'
import './Loader.css'
import '../Components/CSS/Button.css'
import ReactTooltip from 'react-tooltip';

const Contact = () => {

    

    const iframe = '<iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.238729709174!2d73.75950412391427!3d18.653280246812585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e413287e41%3A0x29d8bfdf427740f2!2s43%2C%20Sector%20No.%2026%2C%20Pradhikaran%2C%20Nigdi%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411044!5e0!3m2!1sen!2sin!4v1662206951194!5m2!1sen!2sin" width="700" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
    function Iframe(props) {
        return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
      }

      const copyText1=()=>{
        var copyText = document.getElementById("copytext1");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        navigator.clipboard.writeText(copyText.value);
        document.getElementById("copy1").innerHTML="copied";
        setTimeout(clearText1, 5000);
      }
      const copyText5=()=>{
        var copyText = document.getElementById("copytext5");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        navigator.clipboard.writeText(copyText.value);
        document.getElementById("copy5").innerHTML="copied";
        setTimeout(clearText5, 5000);
      }
      const clearText1=()=>{
        document.getElementById("copy1").innerHTML="";
      }
      const clearText2=()=>{
        document.getElementById("copy2").innerHTML="";
      }
      const clearText3=()=>{
        document.getElementById("copy3").innerHTML="";
      }
      const clearText4=()=>{
        document.getElementById("copy4").innerHTML="";
      }
      const clearText5=()=>{
        document.getElementById("copy5").innerHTML="";
      }
      const copyText2=()=>{
        var copyText = document.getElementById("copytext2");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        navigator.clipboard.writeText(copyText.value);
        document.getElementById("copy2").innerHTML="copied";
        setTimeout(clearText2, 5000);
      }
      const copyText3=()=>{
        var copyText = document.getElementById("copytext3");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        navigator.clipboard.writeText(copyText.value);
        document.getElementById("copy3").innerHTML="copied";
        setTimeout(clearText3, 5000);
      }
      const copyText4=()=>{
        var copyText = document.getElementById("copytext4");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        navigator.clipboard.writeText(copyText.value);
        document.getElementById("copy4").innerHTML="copied";
        setTimeout(clearText4, 5000);
      }
    return (

        <>
            <div className="container">
                <h2 className="py-3 text-center">Contact</h2>
               
                <h3>
                     For any Queries contact us :
                </h3>
                <ul style={{color : "blue"}}>
                    <li>
                        <h4>
                       <input value="meetyourdoctor007@gmail.com" disabled id='copytext1' style={{"border":"none", "width":"400px"}}></input> <a href='mailto:meetyourdoctor007@gmail.com'> <button  className="button-42">Send Email</button></a><p id='copy1'></p>                   
                        </h4>
                    </li>
                    <li>
                        <h4>
                        <input value="omkarmohite505@gmail.com" disabled id='copytext2' style={{"border":"none", "width":"400px"}}></input>  <button onClick={copyText2} className="button-42">Copy Email</button><p id='copy2'></p>         
                        </h4>
                    </li>
                    <li>
                        <h4>
                        <input value="kunallohande23@gmail.com" disabled id='copytext5' style={{"border":"none", "width":"400px"}}></input>  <button onClick={copyText5} className="button-42">Copy Email</button><p id='copy5'></p>         
                        </h4>
                    </li>
                </ul>
                <p><h3>Call Us :</h3><input value="+917620608558" disabled id='copytext3' style={{"border":"none", "width":"400px"}}></input>  <button onClick={copyText3} className="button-42">Copy Mobile No</button> </p><p id='copy3'></p> 
                <p><input value="+918149141899" disabled id='copytext4' style={{"border":"none", "width":"400px"}}></input>  <button onClick={copyText4} className="button-42">Copy Mobile No</button> </p><p id='copy4'></p> 
                <ReactTooltip id='address_tooltip' delayShow={1000}>Click to see Address</ReactTooltip>
                <details>
                  <summary data-tip data-for="address_tooltip">Our Office Address:</summary>
                  <p>43
                    Sector No. 26, Pradhikaran, Nigdi
                    Pimpri-Chinchwad, Maharashtra 411044</p>
                  </details> 
                <Iframe iframe={iframe}></Iframe>
                </div>
        </>
    )
}



export default Contact
