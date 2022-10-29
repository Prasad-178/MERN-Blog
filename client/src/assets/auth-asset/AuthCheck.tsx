function AuthCheck() {
    const c = document.cookie.toString();
    console.log("hi, the cookie is : "+ c + " hi")
    if (c) {
      console.log("hi")
      return true;
    }
    return false;
}

export default AuthCheck