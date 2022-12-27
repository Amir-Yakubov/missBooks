const { useState, useEffect, useRef } = React
import { eventBusService } from "../services/event-bus.service.js"

export function UserMsg() {
    const [msg, steMsg] = useState(null)
    const timeoutRef = useRef(null)

    useEffect(() => {
        eventBusService.on('show-user-msg', (msg) => {
            steMsg(msg)

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
            timeoutRef.current = setTimeout(onCloseMsg, 3000)
        })
    }, [])


    function onCloseMsg() {
        steMsg(null)

    }

    if (!msg) return <span></span>
    return <div className={"user-msg " + msg.type}>
        <button className="user-msg-del-btn" onClick={onCloseMsg}>X</button>
        {msg.txt}
    </div>
}
