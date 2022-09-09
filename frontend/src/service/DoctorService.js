import httpClient from './http-common'

const saveTimetable=(data, token)=>{
   return httpClient.post(`/doctor/save_timetable`, data,{ headers: {"Authorization" : `Bearer ${token}`}});
}
export default{saveTimetable};