/* global chrome */

function getEnterpriseID(callback) {
    if (chrome.enterprise && chrome.enterprise.deviceAttributes) {
        chrome.enterprise.deviceAttributes.getDirectoryDeviceId(callback)
    } else {
        callback(null)
    }
}

export default getEnterpriseID
