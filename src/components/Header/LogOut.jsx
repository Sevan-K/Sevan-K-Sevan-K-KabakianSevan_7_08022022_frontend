/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../utils/style/colors";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the log in link
const LogOutButton = styled.button`
   padding: 1rem;
   font-size: 2.1rem;
   background: none;
   color: ${colors.unactiveLink};
   &:hover {
      color: ${colors.primary};
   }
`;
/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function Logout() {
   // function to handle click on logout button
   const handleLogOut = async () => {
      try {
         // send a request to th route to remove the cookie
         await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}auth/logout`,
            withCredentials: true,
         });
         // go to home page
         window.location = "/";
      } catch (err) {
         console.log(err.message);
      }
   };
   // component to return
   return (
      <LogOutButton onClick={handleLogOut}>
         <FontAwesomeIcon icon={faRightFromBracket} />
      </LogOutButton>
   );
}
export default Logout;
