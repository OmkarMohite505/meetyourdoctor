import httpClient from './http-common';

const uploadPatientProfilePicture = (id, data, token) => {
    return httpClient.post(`/patient/profile_picture/${id}`, data,{ headers: {"Authorization" : `Bearer ${token}`}});
  };

const uploadDoctorProfilePicture =(id, data, token)=>{
    return httpClient.post(`/doctor/profile_picture/${id}`, data, { headers: {"Authorization" : `Bearer ${token}`}});
}

const uploadAppointmentImages=(formData, token)=>{
  return httpClient.post(`/doctor/appointment/images/upload_images/1/1`, formData, { headers: {"Authorization" : `Bearer ${token}`}})
}

const uploadHomeVideo=(formData, token)=>{
  return httpClient.post(`/admin/upload_home_video`, formData, { headers: {"Authorization" : `Bearer ${token}`}})
}



export default{uploadPatientProfilePicture, uploadDoctorProfilePicture,uploadAppointmentImages};