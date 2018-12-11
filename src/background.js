import api from "./js/api.js"

function sleep(ms) {
    return new Promise(resolve => window.setTimeout(resolve, ms))
}

async function sendChronicle() {
    let username
    let serial
    try {
        username = (await api.getEmail()).split("@")[0]
        serial = await api.getSerial()
    } catch (error) {
        console.error("Unable to gather information:", error)
        return
    }

    const send = async() => {
        let ip
        try {
            ip = await api.getLocalIP()
        } catch (error) {
            console.error("Unable to get IP address:", error)
            return
        }

        try {
            await api.sendChronicle(username, serial, ip)
        } catch (error) {
            console.error("Unable to send Chronicle:", error)
        }
    }

    let timer = window.setInterval(send, 15 * 60 * 1000)
    window.addEventListener("online", async() => {
        window.clearInterval(timer)
        timer = window.setInterval(send, 15 * 60 * 1000)
        await sleep(5000)
        send()
    })
    send()
}

sendChronicle()
