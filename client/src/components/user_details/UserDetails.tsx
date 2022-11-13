import { useState, useEffect } from "react"
import axios from "axios"
axios.defaults.withCredentials = true

function UserDetails() {

    const [user, setUser] = useState<any>()

    const sendRequest = async () => {
        const res = await axios
                    .get("http://localhost:3000/secure/user", {
                        // withCredentials: true
                    })
                    .catch((err) => {
                        console.log(err)
                    })

        const data = await res!.data
        console.log("data is ", data)
        return data
    }

    useEffect(() => {
        sendRequest()
        .then((data) => setUser(data.userDetails))
    }, [])

    return (
        <div style={{ marginTop: "20%" }}>
            <h1>Hello</h1>
            {user && <h1>{user.name}</h1>}
        </div>
    )
}

export default UserDetails