import useSWR from "swr";
import storage from "~/common/utils/storage";
import { User } from "./../types/user";

function authenticate(user: User | undefined): user is User {
  return (
    !!user && user?.constructor === Object && Object.keys(user).length !== 0
  );
}

function useUser() {
  const { data: user } = useSWR<User>("user", storage);
  const isLoggedIn = authenticate(user);
  return { ...user, isLoggedIn };
}

export default useUser;
