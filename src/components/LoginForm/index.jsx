/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../utils/hooks";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// Authentification component function
function LogInForm() {
   // email and password state are declared
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   // error message local states
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");

   // using auth and store auth from auth auth thought useAuth
   const { auth, storeAuth } = useAuth();

   // function to handle action on submit
   const handleLogIn = async (event) => {
      event.preventDefault();
      // appel à l'API avec axios (post pour le login)
      try {
         const response = await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}auth/login`,
            // withCredentials: true,
            data: { email: email, password: password },
         });
         console.log("=== response ===>", response);
         // code to handle potential errors
         if (response.data.errors) {
            // !!!!!!!! check how the errors are send by the back
            console.log(response.data.errors);
            setEmailError(response.data.errors.email);
            setPasswordError(response.data.errors.password);
         }
         // if there is no error then we go to home page
         else {
            const { auth } = response.data;
            console.log("=== auth ===>", auth);
            // store auth
            storeAuth(auth);
            // go to home page
            // window.location = "/";
         }
      } catch (error) {
         console.log(error);
      }
   };

   // useEffect to control token value
   useEffect(() => console.log(auth), [auth]);

   // component to return
   return (
      <form action="" onSubmit={handleLogIn} id="login-form">
         <p>LogInForm</p>
         <label htmlFor="email">Email</label>
         <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
         />
         {emailError && <p>{emailError}</p>}
         <label htmlFor="password">Mot de passe</label>
         <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
         />
         {passwordError && <p>{passwordError}</p>}
         <input type="submit" value="Test" />
      </form>
   );
}

// exporting component
export default LogInForm;
