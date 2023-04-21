import { getAuth } from "firebase/auth";

// get current user email
const getCurrentUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    return;
  }
  return user.email;
};

export default getCurrentUserId;
