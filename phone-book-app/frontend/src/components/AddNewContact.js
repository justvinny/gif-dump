import "./AddNewContact.css";
import { useState } from "react";
import phoneBookService from "../services/phoneBookService";

const AddNewContact = ({ contacts, setContacts, dialogMsg, setDialogMsg }) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const showGoodDialogMsg = (msg) => {
        setDialogMsg({ ...dialogMsg, good: msg });

        new Promise((resolve, reject) => {
            setTimeout(() => {
                setDialogMsg({ good: "", error: "" });
                resolve("ok");
            }, 5000);
        }).catch(error => console.log(error));
    }
    const showErrorDialogMsg = (msg) => {
        setDialogMsg({ ...dialogMsg, error: `${msg}` });

        new Promise((resolve, reject) => {
            setTimeout(() => {
                setDialogMsg({ good: "", error: "" });
                resolve("ok");
            }, 5000);
        }).catch(error => console.log(error));
    }
    const checkContactExists = () => contacts.some(contact => contact.name === name);
    const clearFields = () => {
        setName("");
        setNumber("");
    }
    const addContact = (event) => {
        event.preventDefault();

        if (name && number) {
            if (checkContactExists()) {
                let shouldUpdate = window.confirm("Are you sure you want to update number?");

                if (shouldUpdate) {
                    const id = contacts.find(contact => contact.name === name).id;

                    if (id) {
                        phoneBookService
                        .updateNumber(id, number)
                        .then(data => {
                            setContacts(data);
                        })
                        .then(() => {
                            clearFields();
                            showGoodDialogMsg(`Successfully updated number for ${name}`);
                        });
                    }
                }
            } else {
                const newContact = { name, number };
                phoneBookService.addNewContact(newContact)
                    .then(data => {
                        setContacts(data);
                        clearFields();
                        showGoodDialogMsg(`Successfully added ${name}`);
                    })
                    .catch(error => console.log(error));
            }
        } else if (!name) {
            showErrorDialogMsg("Name must not be empty!");
        } else if (!number) {
            showErrorDialogMsg("Number must not be empty!");
        }
    }

    const handleChange = (setState) => (event) => {
        setState(event.target.value);
    }

    return (
        <section>
            <h2>Add New Contact</h2>

            <form className="contactInput" onSubmit={addContact}>
                <label>Name <input placeholder="Name" value={name} onChange={handleChange(setName)}></input></label>
                <label>Number <input placeholder="Number" value={number} onChange={handleChange(setNumber)}></input></label>
                <button type="submit">Add</button>
            </form>
        </section>
    )
}

export default AddNewContact;