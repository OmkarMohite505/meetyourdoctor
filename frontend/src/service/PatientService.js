import httpClient from './http-common'

const getDoctorList=(token)=>{
   return httpClient.get(`/patient/get_all_doctors_list`,{ headers: {"Authorization" : `Bearer ${token}`}});
}

const bookAppointment=(data, token)=>{
   return httpClient.get(`/patient/appointment`,{ headers: {"Authorization" : `Bearer ${token}`}});
}
export default{getDoctorList, bookAppointment};