class Status{
    static Connected = new Status("Connected");
    static SignUp = new Status("SignUp");
    static SignIn = new Status("SignIn");

    constructor(name){
        this.name = name;
    }
}

export default Status;
