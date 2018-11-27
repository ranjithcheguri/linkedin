import { LOGIN_SUCCESS, LOGIN_ERROR, SUBMIT_LOGIN, TRAVELER_SIGNOUT } from './types';
import axios from "axios";
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'

// export function photosinfo(data) {
//     return async function (dispatch) {
//         console.log("dispatching to Check login..")
//         dispatch({
//             type: PHOTOS_INFO,
//             payload: data,
//         })
//     }
// }