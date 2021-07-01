import phoneBookService from "../services/phoneBookService";
import Contact from "./Contact";

const SavedContacts = ({ contacts, setContacts, dialogMsg, setDialogMsg }) => {

    const deleteEvent = (name) => (event) => {
        event.preventDefault();
        let shouldDelete = window.confirm(`Are you sure you want to delete the contact ${name}?`);
        if (shouldDelete) {
            const id = contacts.find(contact => contact.name === name).id;
            phoneBookService
                .deleteContact(id)
                .then(data => {
                    setContacts([...contacts].filter(contact => contact.id !== id));
                    setDialogMsg({...dialogMsg, good:`Successfully deleted ${name}`})
                }).then(() => {
                    setTimeout(() => {
                        setDialogMsg({good:"", error:""});
                    }, 5000);
                })
        }
    }

    return (
        <section>
            <h2>Saved Contacts</h2>
            {contacts.map(contact => (
                <div className="contact" key={contact.name + contact.number}>
                    <Contact name={contact.name} number={contact.number} />
                    <button onClick={deleteEvent(contact.name)}>Delete</button>
                </div>
            ))}
        </section>
    )
}

export default SavedContacts;