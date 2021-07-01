import axios from "axios";

const getAllContacts = () => {
    return axios
        .get("/api/persons")
        .then(response => response.data);
}

const addNewContact = (newContact) => {
    return axios
        .post("/api/persons", newContact)
        .then(response => response.data);
}

const deleteContact = (id) => {
    return axios
        .delete(`/api/persons/${id}`)
        .then(response => response.data);
}

const updateNumber = (id, number) => {
    return axios
        .put(`/api/persons/${id}`, {number})
        .then(respsonse => respsonse.data);
}
const phoneBookService = { getAllContacts, addNewContact, deleteContact, updateNumber }

export default phoneBookService;