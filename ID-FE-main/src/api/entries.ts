import axios from 'axios'


const BASE_URL = process.env.REACT_APP_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_ENV === 'staging'
    ? process.env.REACT_APP_API_URL_STAGING
    : process.env.REACT_APP_API_URL_LOCAL

const PRIVATE = 1;
const PUBLIC = 2;

export function upload(filename: string, size: number, format: string, data: string): Promise<string> {
  const URL = `${BASE_URL}/${PRIVATE}/upload`;
  const body = {
    filename,
    size,
    format,
    data
  };
  return axios.post(URL, body).then(res => res.data);
}

export function sendInvitation(email: string): Promise<any> {
  const URL = `${BASE_URL}/${PRIVATE}/user/invite?email=${email}`;
  return axios.get(URL).then(res => res.data);
}

export function deleteEmployee(id: string): Promise<any> {
  const URL = `${BASE_URL}/${PRIVATE}/user/delete?id=${id}`;
  return axios.delete(URL).then(res => res.data);
}

export function forgotPassword(email: string): Promise<any> {
  const URL = `${BASE_URL}/${PUBLIC}/forgot-password?email=${email}`;
  return axios.get(URL).then(res => res.data);
}

export function resetPassword(password: string, token: string): Promise<any> {
  const URL = `${BASE_URL}/${PUBLIC}/reset-password?password=${password}&token=${token}`;
  return axios.get(URL).then(res => res.data);
}

export function acceptInvitation(token: string): Promise<any> {
  const URL = `${BASE_URL}/${PUBLIC}/accept-invitation?token=${token}`;
  return axios.get(URL).then(res => {console.log(res); return res.data});
}