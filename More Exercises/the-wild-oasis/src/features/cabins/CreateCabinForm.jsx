/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editValues,
  });

  const { errors } = formState;
  const {
    isCreatingCabin: isCabinCreationLoading,
    createCabin: createCabinFn,
  } = useCreateCabin(reset);

  const { isEditing: isEditPending, editCabin: editCabinFn } = useUpdateCabin();

  const isWorking = isCabinCreationLoading || isEditPending;

  async function onSubmit(data) {
    /*console.group("Image data");
    console.dir(data.image[0]);
    console.groupEnd();
    */
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabinFn(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabinFn(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {}

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" errorMessage={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCabinCreationLoading}
          {...register("name", {
            required: "Name is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        errorMessage={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCabinCreationLoading}
          {...register("maxCapacity", {
            required: "Max capacity is required",
            min: {
              value: 1,
              message: "Maximum capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        errorMessage={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isCabinCreationLoading}
          {...register("regularPrice", {
            required: "Regular price is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" errorMessage={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCabinCreationLoading}
          {...register("discount", {
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than Regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" errorMessage={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isCabinCreationLoading}
          defaultValue=""
          {...register("description", {
            required: "Description is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" errorMessage={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
