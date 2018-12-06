/* global API_BASE */

import axios from "axios"

function getDevice(id) {
    return axios.get(API_BASE + "/devices/" + id)
}

export default getDevice
