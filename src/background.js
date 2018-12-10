import api from "./js/api.js"

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
    window.addEventListener("online", () => {
        window.clearInterval(timer)
        send()
        timer = window.setInterval(send, 15 * 60 * 1000)
    })
    send()
}

sendChronicle()
