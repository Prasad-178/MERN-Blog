function AuthCheck() {
    const c = document.cookie.toString();
    if (c) {
      console.log(c.split("=")[1])
      return true;
    }
    return false;
}

export default AuthCheck