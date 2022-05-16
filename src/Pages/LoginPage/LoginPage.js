import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
import { CreateOrUpdateUser } from "../../Functions/AuthFunctions";
const provider = new GoogleAuthProvider();

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <GoogleButton
        onClick={() => {
          console.log("Google button clicked");

          signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              // const { email, accessToken } = user
              console.log(user);
              // ...
              CreateOrUpdateUser(user.accessToken, user).then((res) => {
                console.log(res);
                const { role } = res.data;
                if (role === "admin") {
                  navigate("/admin/dashboard");
                }
              });
            })
            .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });

          //
        }}
      />
    </div>
  );
};

export default LoginPage;
