import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { ArrowDown01Icon } from 'hugeicons-react';

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
    { label: 'Per Second', value: { name: "SECOND", number: 1 } },
    { label: 'Per Minute', value: { name: 'MINUTE', number: 1 } },
    { label: 'Per Hour', value: { name: 'HOUR', number: 1 } },
    { label: 'Per Day', value: { name: 'DAY', number: 1 } },
    { label: 'Per Week', value: { name: 'WEEK', number: 1 } },
    { label: 'Per Month', value: { name: 'MONTH', number: 1 } },
    { label: 'Per Year', value: { name: 'YEAR', number: 1 } },
    { label: 'Per Decade', value: { name: 'DECADE', number: 1 } },
    { label: 'Per Century', value: { name: 'CENTURY', number: 1 } },
  ];

  const numberOptions = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
  ];

  const availabilityOptions = [
    { label: 'Available', value: 'AVAILABLE' },
    { label: 'Occupied', value: 'OCCUPIED' },
    { label: 'Booked', value: 'BOOKED' },
    { label: 'Under Maintenance', value: 'UNDER_MAINTENANCE' },
    { label: 'Suspended', value: 'SUSPENDED' },
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
          `units[${index}].size`,
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
          'unitlessDetails.size',
          'unitlessDetails.paymentCycle',
          'unitlessDetails.available',
        ]);
      }
    },
  }));

  useEffect(() => {
    document.title = `Add Units - Property Upload`;
  })

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
                    <Dropdown
                      value={field.value}
                      placeholder='Number'
                      options={numberOptions}
                      dropdownIcon={<ArrowDown01Icon/>}
                      onChange={(e) => {
                        console.log("New Value:", e.value);
                        field.onChange(e.value);
                        trigger('unitlessDetails.bedRooms');
                      }}
                      min={0}
                      className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                      panelClassName="border border-gray-400 rounded-lg mt-1"
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
                    <Dropdown
                      placeholder={'Number'}
                      value={field.value}
                      options={numberOptions}
                      dropdownIcon={<ArrowDown01Icon/>}
                      onChange={(e) => {
                        field.onChange(e.value);
                        trigger('unitlessDetails.bathRooms');
                      }}
                      className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                      panelClassName="border border-gray-400 rounded-lg mt-1"
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
                      placeholder='e.g., 98'
                      onChange={(e) => {
                        field.onChange(e);
                        trigger('unitlessDetails.size');
                      }}
                      className="w-full border border-gray-400 rounded-lg px-3 py-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
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
                    <InputNumber
                      value={field.value ?? 0}
                      placeholder='UGX'
                      onValueChange={(e) => {
                        field.onChange(e.value);
                        trigger('unitlessDetails.price');
                      }}
                      min={0}
                      prefix='UGX '
                      invalid={errors.unitlessDetails?.price}
                      inputClassName="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
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
                  name="unitlessDetails.paymentCycle"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      filter
                      options={paymentCycleOptions}
                      placeholder='Select duration'
                      value={field.value}
                      dropdownIcon={<ArrowDown01Icon/>}
                      onChange={(e) => {
                        field.onChange(e.value);
                        trigger('unitlessDetails.paymentCycle');
                      }}
                      className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                      panelClassName="border border-gray-400 rounded-lg mt-1"
                    />
                  )}
                />
                {errors.unitlessDetails?.paymentCycle && (
                  <p className="text-red-500 text-sm">{errors.unitlessDetails.paymentCycle.message}</p>
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
                    placeholder='Select status'
                    dropdownIcon={<ArrowDown01Icon/>}
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
                <div className="flex justify-between items-center p-4" onClick={() => toggleUnitCollapse(index)}>
                <h2 className="truncate text-sm font-medium">{ watch('units')[index]?.name ?? `Unit ${index + 1}`}</h2>
                  <div className="flex gap-2">
                    <Button
                      icon={collapsedUnits[index] ? 'pi pi-chevron-down' : 'pi pi-chevron-up'}
                      onClick={() => toggleUnitCollapse(index)}
                      className="text-xs border-0"
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
                                placeholder='e.g., Unit 1 or Kansasa crib, '
                                onChange={(e) => {
                                field.onChange(e);
                                trigger(`units[${index}].name`);
                                }}
                                className="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
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
                            <Dropdown
                              type='number'
                              options={numberOptions}
                              placeholder='Number'
                              dropdownIcon={<ArrowDown01Icon/>}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                                trigger(`units[${index}].bedRooms`);
                              }}
                              className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                              panelClassName="border border-gray-400 rounded-lg mt-1"
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
                            <Dropdown
                              options={numberOptions}
                              placeholder='Number'
                              dropdownIcon={<ArrowDown01Icon/>}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                                trigger(`units[${index}].bathRooms`);
                              }}
                              min={0}
                              className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                              panelClassName="border border-gray-400 rounded-lg mt-1"
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
                              placeholder='e.g., 98'
                              onChange={(e) => {
                                field.onChange(e);
                                trigger(`units[${index}].size`);
                              }}
                              className="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
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
                              <InputNumber
                                placeholder='UGX'
                                value={field.value}
                                onValueChange={(e) => {
                                  field.onChange(e.value);
                                  trigger(`units[${index}].price`);
                                }}
                                prefix='UGX '
                                inputClassName="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                              />
                            )}
                          />
                          {errors.units?.[index]?.price && (
                            <p className="text-red-500 text-sm">{errors.units[index].price.message}</p>
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm">Payment cycle</label>
                          <Controller
                            name={`units[${index}].paymentCycle`}
                            control={control}
                            render={({ field }) => (
                              <Dropdown
                                options={paymentCycleOptions}
                                placeholder='Select duration'
                                dropdownIcon={<ArrowDown01Icon/>}
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e.value);
                                  trigger(`units[${index}].paymentCycle`);
                                }}
                                className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                              />
                            )}
                          />
                          {errors.units?.[index]?.paymentCycle && (
                            <p className="text-red-500 text-sm">{errors.units[index].paymentCycle.message}</p>
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
                              placeholder='Select status'
                              value={field.value}
                              dropdownIcon={<ArrowDown01Icon/>}
                              onChange={(e) => {
                                field.onChange(e.value);
                                trigger(`units[${index}].available`);
                              }}
                              className={`w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]`}
                              panelClassName="border border-gray-400 rounded-lg mt-1"
                              inputClassName={`${ field?.value === 'AVAILABLE' ? 'text-green-600' : 'text-red-600'}`}
                          />
                          )}
                        />
                        {errors.units?.[index]?.available && (
                          <p className="text-red-500 text-sm">{errors.units[index].available.message}</p>
                        )}
                      </div>
                      <div className="col-span-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Photos(Max 20)</label>
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
                                    const newFiles = [...field.value, ...files];
                                    field.onChange(newFiles);
                                    trigger(`units[${index}].media.photos`);
                                  }}
                                />
                                <p className="text-sm text-gray-500 mt-1">Supports JPEG, PNG; max 5MB per file</p>
                              </div>
                              {field.value?.length > 0 && (
                                <div className="mt-2 flex gap-2 flex-wrap">
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
                        <label className="block mb-1 text-sm font-medium text-gray-700">Video (optional but recommended) [Max 5]</label>
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
                                    const newFiles = [...field.value, ...files];
                                    field.onChange(newFiles);
                                    trigger(`units[${index}].media.videos`);
                                  }}
                                />
                                <p className="text-sm text-gray-500 mt-1">Supports MP4; max 10MB</p>
                              </div>
                                
                              {field.value?.length > 0 && (
                                <div className="mt-2 flex gap-2 flex-wrap">
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