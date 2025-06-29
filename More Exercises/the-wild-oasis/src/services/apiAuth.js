import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

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

  //console.log(`fetched user: ${JSON.stringify(fetchedUserData)}`);
  if (error) {
    throw new Error(error.message);
  }

  return fetchedUserData?.user;
}

export async function logout() {
  const { error } = supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({ fullName, password, avatar }) {
  const dataToUpdate = password
    ? { password }
    : fullName
    ? { data: { fullName } }
    : null;

  if (!dataToUpdate) return;

  const { data, error: dataUpdateError } = await supabase.auth.updateUser(
    dataToUpdate
  );

  if (dataUpdateError)
    throw new Error(`Error in user data upload: ${dataUpdateError.message}`);

  console.log(`Updated user: ${data}`);

  if (!avatar) return data;

  const fileName = `${data.user.id}_${Math.random()}`;
  const { error: avatarUploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (avatarUploadError)
    throw new Error(`Error in avatar upload: ${avatarUploadError.message}`);

  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`;
  const { data: avatarUrlUploadResult, error: avatarUrlUploadError } =
    await supabase.auth.updateUser({ data: { avatar: avatarUrl } });

  if (avatarUrlUploadError)
    throw new Error(
      `Error in avatar url upload: ${avatarUrlUploadError.message}`
    );
  return avatarUrlUploadResult;
}
