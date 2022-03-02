/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faSpinner,
   faFileImage,
   faPaperPlane,
   faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllPosts } from "../../actions/post.actions";
import styled from "styled-components";
import { colors, padding } from "../../utils/style/variables";
import { IconButton, UserImageWrapper } from "../../utils/style/Atoms";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the form wrapper
const NewPostFormWrapper = styled.div`
   padding: 2rem;
   width: 90%;
   margin: auto;
   border-radius: 3rem;
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: ${colors.backgroundLight};
`;

// styled component fo the form
const StyledFrom = styled.form`
   width: 100%;
   display: flex;
   flex-flow: row wrap;
`;

// styled component for form header
const FormHeader = styled.header`
   flex: 1 1 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 1rem;
   & > h3 {
      font-size: 1.5rem;
      color: ${colors.darkUnactiveLink};
   }
`;

// styled component for textarea
const StyledTextArea = styled.textarea`
   flex: 1 1 50%;
   border-radius: 2rem;
   border: none;
   padding: 0.5rem 1rem;
`;

// styled component for the log in link
const IconLabel = styled.label`
   padding: ${padding.icons};
   font-size: 2.1rem;
   background: none;
   color: ${colors.darkUnactiveLink};
   transition: 300ms;
   &:hover {
      color: ${colors.primary};
   }
`;

// styled component for post preview (to be replaced by a post component when styled)
const PostPreview = styled.div`
   width: 100%;
   margin-top: 2rem;
   border: 0.1rem solid ${colors.primary};
   border-radius: 1rem;
   padding: 1rem;
   background-color: #fff;
   & > p {
      margin-bottom: 1rem;
   }
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function NewPostForm() {
   // user data are required from the store
   const user = useSelector((store) => store.userReducer);
   // local state to know if component is loading
   const [isLoading, setIsLoading] = useState(true);

   // local state for new post content
   const [content, updateContent] = useState("");
   // local state for new post file
   const [file, setFile] = useState(null);
   // local state for uploaded image preview
   const [filePreview, setFilePreview] = useState("");

   // get acces to redux actions using useDispatch hook
   const dispatch = useDispatch();

   // use effect to stop loading spiner
   useEffect(() => {
      if (!!user) {
         setIsLoading(false);
      }
   }, [user]);

   // function to handle file upload
   const handleFileUpdload = (event) => {
      // get file from event target file list
      const [file] = event.target.files;
      // set file as the recovered one
      setFile(file);
      // define an url to display file preview
      setFilePreview(URL.createObjectURL(file));
   };

   // function to reset newPostForm
   const resetNewPostForm = () => {
      setFile(null);
      updateContent("");
      setFilePreview("");
   };

   // function to handle submit
   const handleNewPostSubmit = async (event) => {
      event.preventDefault();
      //   console.log("=== file ===>", file);
      //   console.log("=== content ===>", content);
      const newPost = {
         content,
         userId: user.id,
      };
      // building postToSend object
      let postToSend;
      if (!!file) {
         postToSend = new FormData();
         postToSend.append("post", JSON.stringify(newPost));
         postToSend.append("image", file);
      } else {
         postToSend = newPost;
      }
      console.log("=== postToSend ===>", postToSend);
      // code to add in an post action (not in reducer)
      await axios({
         method: "post",
         url: `${process.env.REACT_APP_API_URL}posts`,
         withCredentials: true,
         data: postToSend,
      });

      // reload all the post to update the store
      dispatch(getAllPosts());

      // console.log("=== post ===>", response.data);
      // reset new post form
      resetNewPostForm();
   };

   return (
      <NewPostFormWrapper>
         {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
         ) : (
            <>
               <StyledFrom action="" onSubmit={handleNewPostSubmit}>
                  {(content || file) && (
                     <FormHeader>
                        <IconButton
                           color={colors.darkUnactiveLink}
                           onClick={(event) => {
                              event.preventDefault();
                              resetNewPostForm();
                           }}
                        >
                           <FontAwesomeIcon icon={faCircleArrowLeft} />
                        </IconButton>
                        <h3>Créer un nouveau post</h3>
                        <IconLabel htmlFor="newPostSubmit">
                           <FontAwesomeIcon icon={faPaperPlane} />
                        </IconLabel>
                        <input
                           type="submit"
                           name="newPostSubmit"
                           id="newPostSubmit"
                           value="Envoyer"
                           style={{ display: "none" }}
                        />
                     </FormHeader>
                  )}

                  <UserImageWrapper>
                     <img src={user.imageUrl} alt="" />
                  </UserImageWrapper>
                  <StyledTextArea
                     name="newPostContent"
                     id="newPostContent"
                     type="text"
                     placeholder="Quoi de neuf ?"
                     value={content}
                     onChange={(event) => updateContent(event.target.value)}
                     //   cols="30"
                     //   rows="10"
                  ></StyledTextArea>
                  <IconLabel htmlFor="newPostImage">
                     <FontAwesomeIcon icon={faFileImage} />
                  </IconLabel>
                  <input
                     type="file"
                     name="newPostImage"
                     id="newPostImage"
                     onChange={handleFileUpdload}
                     style={{ display: "none" }}
                     accept="image/png, image/jpeg, image/jpg"
                  />
               </StyledFrom>
               {(content || file) && (
                  <PostPreview>
                     {content && <p>{content}</p>}
                     {file && (
                        <p>
                           <img src={filePreview} alt="Post" />
                        </p>
                     )}
                  </PostPreview>
               )}
            </>
         )}
      </NewPostFormWrapper>
   );
}

// export the create component
export default NewPostForm;
