//Used in /error route. Generic error message for uncaught errors (typically 500).

const UnhandledError = () => {
    return (
        <>
        <h2>Error has occurred</h2>
        <p>A non-specific error has occurred.  We apologize.</p>
        </>
    )
}

export default UnhandledError