import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Plus } from 'lucide-react';
import { CloudUploadIcon, PlusSignIcon } from 'hugeicons-react';

const AddUnits = forwardRef(({ control, errors, setValue }, ref) => {
  const { trigger, watch } = useFormContext();

  const unitsAvailable = watch('unitsAvailable', false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'units',
  });

  // State for collapsed/expanded units
  const [collapsedUnits, setCollapsedUnits] = useState(fields.map(() => true));

  const paymentCycleOptions = [
    { label: 'Select duration', value: '' },
    { label: 'Second', value: 'SECOND' },
    { label: 'Minute', value: 'MINUTE' },
    { label: 'Hour', value: 'HOUR' },
    { label: 'Day', value: 'DAY' },
    { label: 'Week', value: 'WEEK' },
    { label: 'Month', value: 'MONTH' },
    { label: 'Year', value: 'YEAR' },
    { label: 'Decade', value: 'DECADE' },
    { label: 'Century', value: 'CENTURY' },
  ];

  const availabilityOptions = [
    { label: 'Select status', value: '' },
    { label: 'Available', value: 'AVAILABLE' },
    { label: 'Unavailable', value: 'UNAVAILABLE' },
  ];

  // Toggle collapse/expand for a unit
  const toggleUnitCollapse = (index) => {
    const newCollapsedUnits = [...collapsedUnits];
    newCollapsedUnits[index] = !newCollapsedUnits[index];
    setCollapsedUnits(newCollapsedUnits);
  };

  const addNewUnit = () => {
    append({
      name: '',
      description: '',
      price: 0,
      media: { photos: [], videos: [] },
      paymentCycle: '',
      size: '',
      bedRooms: 0,
      bathRooms: 0,
      available: '',
    });
    setCollapsedUnits([...collapsedUnits, false]);
  };

  // Remove a unit
  const removeUnit = (index) => {
    remove(index);
    setCollapsedUnits(collapsedUnits.filter((_, i) => i !== index));
  };

  // Expose a validate function to the parent component
  useImperativeHandle(ref, () => ({
    validate: async () => {
      if (unitsAvailable) {
        // Validate all units
        const unitValidations = fields.map((_, index) => [
          `units[${index}].bedRooms`,
          `units[${index}].bathRooms`,
          `units[${index}].price`,
          `units[${index}].paymentCycle`,
          `units[${index}].available`,
        ]).flat();
        return await trigger(unitValidations);
      } else {
        // Validate unitless details
        return await trigger([
          'unitlessDetails.bedRooms',
          'unitlessDetails.bathRooms',
          'unitlessDetails.price',
          'unitlessDetails.paymentCycle',
          'unitlessDetails.available',
        ]);
      }
    },
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-[1rem] font-[500]">Add Units</h1>
      <div className="flex flex-col gap-4">
        {/* Toggle Switch */}
        <div>
          <label className="block mb-1 text-sm">Does this property have units?</label>
          <Controller
            name="unitsAvailable"
            control={control}
            render={({ field }) => (
              <InputSwitch
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.value);
                  trigger('unitsAvailable');
                }}
                
                inputClassName="bg-green-500"
              />
            )}
          />
        </div>

        {/* If unitsAvailable is false, show unitless details form */}
        {!unitsAvailable && (
          <div className="border border-gray-300 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm">Bedrooms</label>
                <Controller
                  name="unitlessDetails.bedRooms"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      type='number'
                      value={field.value}
                      onValueChange={(e) => {
                        field.onChange(e.value);
                        trigger('unitlessDetails.bedRooms');
                      }}
                      min={0}
                      className="w-full border border-gray-400 rounded-lg px-3 py-2 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                    />
                  )}
                />
                {errors.unitlessDetails?.bedRooms && (
                  <p className="text-red-500 text-sm">{errors.unitlessDetails.bedRooms.message}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm">Bathrooms</label>
                <Controller
                  name="unitlessDetails.bathRooms"
                  control={control}
                  render={({ field }) => (
                    <InputText
                    type='number'
                      value={field.value}
                      onValueChange={(e) => {
                        field.onChange(e.value);
                        trigger('unitlessDetails.bathRooms');
                      }}
                      min={0}
                      className="w-full border border-gray-400 rounded-lg px-3 py-2 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                    />
                  )}
                />
                {errors.unitlessDetails?.bathRooms && (
                  <p className="text-red-500 text-sm">{errors.unitlessDetails.bathRooms.message}</p>
                )}
              </div>
              <div className="flex-1 col-span-2">
                <label className="block mb-1 text-sm">Size (sqft)</label>
                <Controller
                  name="unitlessDetails.size"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        trigger('unitlessDetails.size');
                      }}
                      className="w-full border border-gray-400 rounded-lg px-3 py-2 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                    />
                  )}
                />
                {errors.unitlessDetails?.size && (
                  <p className="text-red-500 text-sm">{errors.unitlessDetails.size.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm">Rent fee (UGX)</label>
                <Controller
                  name="unitlessDetails.price"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      type='number'
                      value={field.value}
                      onValueChange={(e) => {
                        field.onChange(e.value);
                        trigger('unitlessDetails.price');
                      }}
                      min={0}
                      className="w-full border border-gray-400 rounded-lg px-3 py-2 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                    />
                  )}
                />
                {errors.unitlessDetails?.price && (
                  <p className="text-red-500 text-sm">{errors.unitlessDetails.price.message}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm">Payment cycle</label>
                <Controller
                  name="unitlessDetails.paymentCycle.name"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      filter
                      options={paymentCycleOptions}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.value);
                        trigger('unitlessDetails.paymentCycle.name');
                      }}
                      className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                      panelClassName="border border-gray-400 rounded-lg mt-1"
                    />
                  )}
                />
                {errors.unitlessDetails?.paymentCycle?.name && (
                  <p className="text-red-500 text-sm">{errors.unitlessDetails.paymentCycle.name.message}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm">Availability</label>
              <Controller
                name="unitlessDetails.available"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    options={availabilityOptions}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.value);
                      trigger('unitlessDetails.available');
                    }}
                    className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                    panelClassName="border border-gray-400 rounded-lg mt-1"
                  />
                )}
              />
              {errors.unitlessDetails?.available && (
                <p className="text-red-500 text-sm">{errors.unitlessDetails.available.message}</p>
              )}
            </div>
          </div>
        )}

        {/* If unitsAvailable is true, show dynamic units form */}
        {unitsAvailable && (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="relative border border-gray-300 rounded-lg">
                  <i
                      onClick={() => removeUnit(index)}
                      className="pi pi-times absolute top-[40%] -right-12 bg-gray-300 rounded-full cursor-pointer p-1 text-[8px]"
                  />
                <div className="flex justify-between items-center p-4">
                  <h2 className="text-sm font-medium">Unit {index + 1}</h2>
                  <div className="flex gap-2">
                    <Button
                      icon={collapsedUnits[index] ? 'pi pi-chevron-down' : 'pi pi-chevron-up'}
                      onClick={() => toggleUnitCollapse(index)}
                      className="text-xs"
                    />
                  </div>
                </div>
                {!collapsedUnits[index] && (
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className='col-span-3'>
                        <label className="block mb-1 text-sm">Unit name</label>
                        <Controller
                            name={`units[${index}].name`}
                            control={control}
                            render={({ field }) => (
                            <InputText
                                {...field}
                                onChange={(e) => {
                                field.onChange(e);
                                trigger(`units[${index}].name`);
                                }}
                                className="w-full border border-gray-400 rounded-lg px-3 py-2 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                            />
                            )}
                        />
                        {errors.units?.[index]?.name && (
                            <p className="text-red-500 text-sm">{errors.units[index].name.message}</p>
                        )}
                        </div>
                      <div className="flex-1">
                        <label className="block mb-1 text-sm">Bedrooms</label>
                        <Controller
                          name={`units[${index}].bedRooms`}
                          control={control}
                          render={({ field }) => (
                            <InputText
                              type='number'
                              value={field.value}
                              onValueChange={(e) => {
                                field.onChange(e.value);
                                trigger(`units[${index}].bedRooms`);
                              }}
                              min={0}
                              className="w-full border border-gray-400 rounded-lg px-3 py-2 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                            />
                          )}
                        />
                        {errors.units?.[index]?.bedRooms && (
                          <p className="text-red-500 text-sm">{errors.units[index].bedRooms.message}</p>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 text-sm">Bathrooms</label>
                        <Controller
                          name={`units[${index}].bathRooms`}
                          control={control}
                          render={({ field }) => (
                            <InputText
                              type='number'
                              value={field.value}
                              onValueChange={(e) => {
                                field.onChange(e.value);
                                trigger(`units[${index}].bathRooms`);
                              }}
                              min={0}
                              className="w-full border border-gray-400 rounded-lg px-3 py-2 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                            />
                          )}
                        />
                        {errors.units?.[index]?.bathRooms && (
                          <p className="text-red-500 text-sm">{errors.units[index].bathRooms.message}</p>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 text-sm">Size (sqft)</label>
                        <Controller
                          name={`units[${index}].size`}
                          control={control}
                          render={({ field }) => (
                            <InputText
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                trigger(`units[${index}].size`);
                              }}
                              className="w-full border border-gray-400 rounded-lg px-3 py-2 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                            />
                          )}
                        />
                        {errors.units?.[index]?.size && (
                          <p className="text-red-500 text-sm">{errors.units[index].size.message}</p>
                        )}
                      </div>
                      <div className='grid grid-cols-2 col-span-3 gap-4'>
                        <div className="flex-1">
                            <label className="block text-sm">Rent fee (UGX)</label>
                            <Controller
                            name={`units[${index}].price`}
                            control={control}
                            render={({ field }) => (
                                <InputText
                                type='number'
                                value={field.value}
                                onValueChange={(e) => {
                                    field.onChange(e.value);
                                    trigger(`units[${index}].price`);
                                }}
                                min={0}
                                className="w-full border border-gray-400 rounded-lg px-3 py-2 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                                />
                            )}
                            />
                            {errors.units?.[index]?.price && (
                            <p className="text-red-500 text-sm">{errors.units[index].price.message}</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm">Payment cycle Name</label>
                            <Controller
                            name={`units[${index}].paymentCycle.name`}
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                options={paymentCycleOptions}
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e.value);
                                    trigger(`units[${index}].paymentCycle.name`);
                                }}
                                className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                                />
                            )}
                            />
                            {errors.units?.[index]?.paymentCycle?.name && (
                            <p className="text-red-500 text-sm">{errors.units[index].paymentCycle.name.message}</p>
                            )}
                        </div>
                      </div>
                      <div className='col-span-3'>
                          <label className="block mb-1 text-sm">Availability</label>
                          <Controller
                              name={`units[${index}].available`}
                              control={control}
                              render={({ field }) => (
                              <Dropdown
                                  options={availabilityOptions}
                                  value={field.value}
                                  onChange={(e) => {
                                  field.onChange(e.value);
                                  trigger(`units[${index}].available`);
                                  }}
                                  className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                                  panelClassName="border border-gray-400 rounded-lg mt-1"
                              />
                              )}
                          />
                          {errors.units?.[index]?.available && (
                              <p className="text-red-500 text-sm">{errors.units[index].available.message}</p>
                          )}
                      </div>
                      <div className="col-span-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Photos (optional)</label>
                        <Controller
                          name={`units[${index}].media.photos`}
                          control={control}
                          render={({ field }) => (
                            <div className="">
                              <div className='text-center border-2 border-dashed border-gray-200 rounded-lg p-4'>
                                <label htmlFor={`photo-upload-${index}`} className="text-blue-500 underline cursor-pointer">Upload</label>
                                <input
                                  id={`photo-upload-${index}`}
                                  type="file"
                                  multiple
                                  accept="image/jpeg,image/png"
                                  className="hidden"
                                  onChange={(e) => {
                                    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
                                    field.onChange(files);
                                    trigger(`units[${index}].media.photos`);
                                  }}
                                />
                                <p className="text-sm text-gray-500 mt-1">Supports JPEG, PNG; max 5MB per file</p>
                              </div>
                              {field.value?.length > 0 && (
                                <div className="mt-2 flex gap-2">
                                  {field.value.map((photoUrl, idx) => (
                                    <div key={idx} className="relative">
                                      <img src={photoUrl} alt="Uploaded" className="w-14 h-14 object-cover rounded-lg" />
                                      <button
                                        onClick={() => {
                                          const updatedFiles = field.value.filter((_, i) => i !== idx);
                                          field.onChange(updatedFiles);
                                          trigger(`units[${index}].media.photos`);
                                        }}
                                        className="absolute top-1 right-1 bg-gray-200 rounded-full p-1 flex justify-center items-center"
                                      >
                                        <i className='pi pi-times text-[8px]' />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        />
                        {errors.units?.[index]?.media?.photos && (
                          <p className="text-red-500 text-sm">{errors.units[index].media.photos.message}</p>
                        )}
                      </div>

                      <div className="col-span-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Video (optional)</label>
                        <Controller
                          name={`units[${index}].media.videos`}
                          control={control}
                          render={({ field }) => (
                            <div className="">
                              <div className='text-center border-2 border-dashed border-gray-200 rounded-lg p-4'>
                                <label htmlFor={`video-upload-${index}`} className="text-blue-500 underline cursor-pointer text-center">Upload</label>
                                <input
                                  id={`video-upload-${index}`}
                                  type="file"
                                  multiple
                                  accept="video/mp4"
                                  className="hidden"
                                  onChange={(e) => {
                                    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
                                    field.onChange(files);
                                    trigger(`units[${index}].media.videos`);
                                  }}
                                />
                                <p className="text-sm text-gray-500 mt-1">Supports MP4; max 10MB</p>
                              </div>
                                
                              {field.value?.length > 0 && (
                                <div className="mt-2 flex gap-2">
                                  {field.value.map((videoUrl, idx) => (
                                    <div key={idx} className="relative">
                                      <video src={videoUrl} className="w-14 h-14 object-cover rounded-lg" controls />
                                      <button
                                        onClick={() => {
                                          const updatedFiles = field.value.filter((_, i) => i !== idx);
                                          field.onChange(updatedFiles);
                                          trigger(`units[${index}].media.videos`);
                                        }}
                                        className="absolute top-1 right-1 bg-gray-200 rounded-full p-1 flex justify-center items-center"
                                      >
                                        <i className='pi pi-times text-[8px]' />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        />
                        { errors.units?.[index]?.media?.videos && (
                          <p className="text-red-500 text-sm">{errors.units[index].media.videos.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Button
              icon="pi pi-plus"
              onClick={addNewUnit}
              className="w-full bg-gray-200 text-sm font-semibold flex items-center justify-center py-3 gap-4 rounded-lg p-2"
            >
                Add More
            </Button>

          </div>
        )}
      </div>
    </div>
  );
});

export default AddUnits;