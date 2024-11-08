import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error(`Cabin-${id} could not be deleted`);
  }
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random() * 100}-${newCabin.image.name}`.replace(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  console.group("Created cabin");
  console.dir(data);
  console.groupEnd();
  if (error) {
    console.log(error);
    throw new Error(`New cabin could not be created`);
  }

  const { data: imageData, error: imageUploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (imageUploadError) {
    await deleteCabin(data.at(0).id);
    console.log(imageUploadError);
    throw new Error(
      "The image could not be uploaded, and the cabin was not created"
    );
  }
}
