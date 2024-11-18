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

export async function createEditCabin(cabin, id) {
  console.group("cabin on create-edit");
  console.dir(cabin);
  console.groupEnd();

  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random() * 100}-${cabin.image.name}`?.replace(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let data;

  console.log(`id is ${id}`);
  if (!id) {
    data = createCabin({ ...cabin, image: imagePath });
  } else {
    data = updateCabin({ ...cabin, image: imagePath }, id);
  }

  console.group("Created/updated cabin");
  console.dir(data);
  console.groupEnd();

  if (hasImagePath) {
    return data;
  }

  const { data: imageData, error: imageUploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (imageUploadError) {
    await deleteCabin(data.at(0).id);
    console.log(imageUploadError);
    throw new Error(
      "The image could not be uploaded, and the cabin was not created"
    );
  }
}

async function createCabin(cabinData) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabinData])
    .select()
    .single();

  if (error) {
    console.group("Cabin create error");
    console.dir(error.message);
    console.groupEnd();

    throw new Error(`Cabin cannot be created`);
  }

  return data;
}

async function updateCabin(cabinData, cabinId) {
  console.group("cabin for update");
  console.dir(cabinData);
  console.groupEnd();
  const { data, error } = await supabase
    .from("cabins")
    .update(cabinData)
    .eq("id", cabinId)
    .select()
    .single();

  if (error) {
    console.group("Cabin update error");
    console.dir(error.message);
    console.groupEnd();

    throw new Error(`Cabin cannot be updated`);
  }

  return data;
}
