/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import Thread from "../../components/Thread";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */

const testPost = [
   {
      id: 1,
      content: "Post 1",
      userId: 1,
   },
   {
      id: 2,
      content: "Post 2",
      userId: 1,
   },
];

// component function
function Home() {
   return (
      <div>
         <h1>Page d'accueil</h1>
         <Thread />
      </div>
   );
}

// exporting component
export default Home;
