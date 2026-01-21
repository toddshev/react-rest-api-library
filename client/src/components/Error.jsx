const Error = ( {errors} ) => {
    let display = null;

    if (errors.length) {
        display = (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
    return display;
}
export default Error;