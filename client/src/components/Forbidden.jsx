

const Forbidden = () => {
    return (
        <>
         <div id="root">
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                    <ul className="header--signedin">
                        <li>Welcome, Joe Smith!</li>
                        <li><a href="sign-out.html">Sign Out</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <main>
            <div class="wrap">
                <h2>Forbidden</h2>
                <p>Oh oh! You can't access this page.</p>
            </div>
        </main>
    </div>
        </>

    )
}

export default Forbidden;