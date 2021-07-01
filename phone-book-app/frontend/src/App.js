import AddNewContact from "./components/AddNewContact";
import FilterName from "./components/FilterName";
import SavedContacts from "./components/SavedContacts";
import Dialog from "./components/Dialog";
import phoneBookService from "./services/phoneBookService";
import { useState, useEffect } from "react";

const App = () => {
    // States
    const [contacts, setContacts] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [dialogMsg, setDialogMsg] = useState({ good: "", error: "" });

    // Use Effect hook
    useEffect(() => {
        phoneBookService
            .getAllContacts()
            .then(data => setContacts(data))
            .catch(error => console.log(error));
    }, []);

    const displayContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filterName.toLowerCase()));
    return (
        <>
            <header>
                <h1>Phonebook</h1>
            </header>
            <main>
                <Dialog dialogMsg={dialogMsg} />
                <FilterName filterName={filterName} setFilterName={setFilterName} />
                <AddNewContact contacts={contacts} setContacts={setContacts} dialogMsg={dialogMsg} setDialogMsg={setDialogMsg} />
                <SavedContacts contacts={displayContacts} setContacts={setContacts} dialogMsg={dialogMsg} setDialogMsg={setDialogMsg} />
            </main>
        </>
    )
}
export default App;
