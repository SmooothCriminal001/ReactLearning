import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    settings = {},
    isFetchingSettings,
    settingsFetchError,
  } = useSettings();

  const { isUpdatingSettings, updateSettings } = useUpdateSettings();

  if (isFetchingSettings) {
    return <Spinner />;
  }

  console.group("settings");
  console.dir(settings);
  console.groupEnd();

  const handleUpdate = function (e, fieldName) {
    const valueToUpdate = e.target.value;

    if (!valueToUpdate) return;
    updateSettings({ [fieldName]: e.target.value });
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdatingSettings}
          defaultValue={settings.minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdatingSettings}
          defaultValue={settings.maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdatingSettings}
          defaultValue={settings.maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdatingSettings}
          defaultValue={settings.breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
