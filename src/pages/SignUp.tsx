function SignUp() {
    return (
        <div className="SignUpFields">
            <h1>Sign up!</h1>
            <form>
                <input type="text" id="email" name="email" placeholder="Email" />
                <input type="password" id="password" name="password" placeholder="Password" />
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}

export default SignUp;