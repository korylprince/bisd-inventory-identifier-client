/* global chrome */
/* global API_BASE */
/* global API_SECRET */
/* global CHRONICLE_BASE */
/* global SEARCH_BASE */
/* global MOCK_SERIAL */

import axios from "axios"

export default {
    getSerial() {
        return new Promise((resolve, reject) => {
            if (MOCK_SERIAL) {
                resolve(MOCK_SERIAL)
                return
            }

            if (chrome.enterprise == null || chrome.enterprise.deviceAttributes == null) {
                reject(Error("Unable to access enterprise.deviceAttributes service"))
                return
            }
            chrome.enterprise.deviceAttributes.getDeviceSerialNumber(serial => {
                if (serial == null || serial === "") {
                    reject(Error("No serial found"))
                    return
                }
                resolve(serial)
            })
        })
    },

    getEmail() {
        return new Promise((resolve, reject) => {
            if (chrome.identity == null) {
                reject(Error("Unable to access identity service"))
                return
            }
            chrome.identity.getProfileUserInfo(userInfo => {
                if (userInfo.email == null || userInfo.email === "") {
                    reject(Error("No email address found"))
                    return
                }
                resolve(userInfo.email)
            })
        })
    },

    getLocalIP() {
        return new Promise((resolve, reject) => {
            const ips = []

            const conn = new window.RTCPeerConnection({iceServers: []})
            conn.createDataChannel("")

            conn.onicecandidate = function(ev) {
                if (!ev.candidate) {
                    conn.close()
                    if (ips.length === 0) {
                        reject(Error("No IP addresses found"))
                        return
                    }
                    resolve(ips[0])
                    return
                }
                const ip = /(\d{1,3}\.){3}\d{1,3}/.exec(ev.candidate.candidate)[0]
                // 100.115.92.1 is the Android bridge IP
                if (ip !== "100.115.92.1" && ips.indexOf(ip) == -1) {
                    ips.push(ip)
                }
            }

            conn.createOffer(sdp => {
                conn.setLocalDescription(sdp)
            }, error => reject(error))
        })
    },

    async getDevice(serial) {
        return (await axios.get(API_BASE + "/device/" + serial, {headers: {"Authorization": "Bearer " + API_SECRET}})).data
    },

    sendChronicle(username, serial, ip) {
        return axios.post(CHRONICLE_BASE + "/submit", {username, serial, ip})
    },

    openInventoryTab(inventory_number) {
        chrome.tabs.create({url: SEARCH_BASE + inventory_number})
    },
}
