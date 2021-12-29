import axios from "axios";

export default function Logout() {
    const customerId = localStorage.getItem("customerId")
    axios.put('http://localhost:6969/customer/logout/'+customerId)

    localStorage.clear()
    window.location.href = "/";
}