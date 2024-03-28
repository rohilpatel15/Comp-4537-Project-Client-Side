function Login() {
    return (
        <div className="LoginFields">
            <h1>Log in or Sign up!</h1>
            <form>
                <input type="text" id="email" name="email" placeholder="Email" />
                <input type="password" id="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}

export default Login;