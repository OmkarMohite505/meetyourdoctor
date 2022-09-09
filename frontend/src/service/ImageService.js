import httpClient from './http-common';

const uploadPatientProfilePicture = (id, data, token) => {
    return httpClient.post(`/patient/profile_picture/${id}`, data,{ headers: {"Authorization" : `Bearer ${token}`}});
  };

const uploadDoctorProfilePicture =(id, data, token)=>{
    return httpClient.post(`/doctor/profile_picture/${id}`, data, { headers: {"Authorization" : `Bearer ${token}`}});
}

export default{uploadPatientProfilePicture, uploadDoctorProfilePicture};