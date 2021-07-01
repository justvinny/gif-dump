import "./Dialog.css";

const Dialog = ({dialogMsg}) => {
    const {good, error} = dialogMsg;
    const displayMsg = () => {
        if (good) {
            return <h2 className="dialogMsg">{good}</h2>;
        } else if (error) {
            return <h2 className="errorMsg">{error}</h2>;
        } else {
            return <></>
        }
    }


    return displayMsg();
}

export default Dialog;