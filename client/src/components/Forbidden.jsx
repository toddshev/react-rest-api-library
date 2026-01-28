//Display friendly message if routed to /forbidden or used in a component

const Forbidden = () => {
    return (
        <div className="wrap unauth-access">
            <h2>Forbidden</h2>
            <p>Oh oh! You can't access this page.</p>
        </div>
    )
}

export default Forbidden;