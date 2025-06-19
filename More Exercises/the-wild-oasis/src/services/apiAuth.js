import supabase from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();

  if (!data?.session) {
    console.log(`No session`);
    return null;
  }

  const { data: fetchedUserData, error } = await supabase.auth.getUser();

  console.log(`fetched user: ${JSON.stringify(fetchedUserData)}`);
  if (error) {
    throw new Error(error.message);
  }

  return fetchedUserData?.user;
}
