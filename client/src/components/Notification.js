const Notification = ({type, message}) => {
    if (message === null) {
        return null
    }
    else {
        return (
            <div id="notification" className={type}>
                <p>{message}</p>
            </div>
        )
    }
}

export default Notification