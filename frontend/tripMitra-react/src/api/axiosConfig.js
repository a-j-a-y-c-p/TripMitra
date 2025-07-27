import axios from 'axios';


const baseURL = "http://localhost:8910";

export default axios.create({
    baseURL: baseURL,
    headers: {"ngrok-skip-browser-warning":"true"},

});