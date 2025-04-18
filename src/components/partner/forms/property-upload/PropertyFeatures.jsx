import { ArrowDown01Icon, ArrowUp01Icon } from 'hugeicons-react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

const PropertyFeatures = forwardRef(({ control, errors, setValue }, ref) => {
  const { trigger, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'customFeatures'});
  const [collapsedCustomFeatures, setCollapsedCustomFeatures] = useState(fields.map(() => true));

  const toggleUnitCollapse = (index) => {
    const newCollapsedCustomFeatures = [...collapsedCustomFeatures];
    newCollapsedCustomFeatures[index] = !newCollapsedCustomFeatures[index];
    setCollapsedCustomFeatures(newCollapsedCustomFeatures);
  };

  const addNewFeature = () => {
    append({
      name: '',
      description: ''
    });
    setCollapsedCustomFeatures([...collapsedCustomFeatures, false]);
  };

  const removeFeature = (index) => {
    remove(index);
    setCollapsedCustomFeatures(collapsedCustomFeatures.filter((_, i) => i !== index));
  };
  
  useImperativeHandle(ref, () => ({
    validate: async () => {
      const isValid = await trigger([
        'parkingCapacity',
        'furnishing',
        'amenities.*',
        'customFeatures',
      ]);
      return isValid;
    },
  }));

  const amenities = [
    { label: "Security", value: 'security'},
    { label: "Air Conditioning", value: 'airConditioning'},
    { label: "Gym", value: 'gym'},
    { label: "Parking", value: 'parking'},
    { label: "Internet", value: 'internet'},
    { label: "Maintenance", value: 'maintenance'},
    { label: "Fire Unit", value: 'fireUnit'},
    { label: "Swimming Pool", value: 'swimmingPool'},
    { label: "Laundry Services", value: 'laundryServices'},
    { label: "Sports", value: 'sports'},
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

  useEffect(() => {
    document.title = `Property Features - Property Upload`;
  })

  return (
    <div className="space-y-4">
      <h1 className='text-[1rem] font-[500]'>Property Features</h1>
      <div className="flex flex-col gap-4">
        <section className='grid grid-cols-2 gap-4'>
          <div className="flex-1">
            <label className="block mb-1 text-sm">Parking Spaces</label>
            <Controller
              name="parkingCapacity"
              control={control}
              render={({ field }) => (
                <Dropdown
                  placeholder={'Number'}
                  value={field.value}
                  options={numberOptions}
                  dropdownIcon={<ArrowDown01Icon/>}
                  onChange={(e) => {
                    field.onChange(e.value);
                    trigger('parkingCapacity');
                  }}
                  className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                  panelClassName="border border-gray-400 rounded-lg mt-1"
                />
              )}
            />
            {errors.parkingCapacity && (
              <p className="text-red-500 text-sm">{errors.parkingCapacity.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm">Furnishing</label>
            <Controller
              name="furnishing"
              control={control}
              render={({ field }) => (
                <Dropdown
                  placeholder={'Select option'}
                  value={field.value}
                  options={[{ label: 'Furnished', value: 'FURNISHED' }, { label: 'Unfurnished', value: 'UNFURNISHED' }]}
                  dropdownIcon={<ArrowDown01Icon/>}
                  onChange={(e) => {
                    field.onChange(e.value);
                    trigger('furnishing');
                  }}
                  className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                  panelClassName="border border-gray-400 rounded-lg mt-1"
                />
              )}
            />
            {errors.furnishing && (
              <p className="text-red-500 text-sm">{errors.furnishing.message}</p>
            )}
          </div>
        </section>
        <section className='space-y-4'>
          <h2 className="block mb-1 text-sm">Amenities</h2>
          <div className='grid grid-cols-2 gap-2'>
            { amenities && amenities.map((amenity, index) => (
              <div key={index}>
                <Controller
                  name={`amenities.${amenity.value}`}
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        value={field.value}
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          trigger(`amenities.${amenity.value}`);
                        }}
                        className="w-4 h-4"
                      />
                      <label className='text-sm text-gray-600'>{amenity.label}</label>
                    </div>
                  )}
                />
              </div>
            ))}
          </div>
        </section>

        <section className='space-y-4'>
          <h1 className="block mb-1 text-sm">Custom Features</h1>
          <div className='space-y-4'>
            {fields.map((field, index) => (
              <div key={field.id} className="relative border border-gray-300 rounded-lg">
                  <i
                    onClick={() => removeFeature(index)}
                    className="pi pi-times absolute top-[40%] -right-12 bg-gray-300 rounded-full cursor-pointer p-1 text-[8px]"
                  />
                <div className="flex justify-between items-center p-4" onClick={() => toggleUnitCollapse(index)}>
                  <h2 className="truncate text-sm font-medium">{ watch('customFeatures')[index]?.name !== '' ? watch('customFeatures')[index]?.name : `[ New Feature ][${index + 1}]`}</h2>
                  <div className="flex gap-2">
                    <Button
                      icon={collapsedCustomFeatures[index] ? <ArrowDown01Icon/> : <ArrowUp01Icon/>}
                      onClick={() => toggleUnitCollapse(index)}
                      className="text-xs"
                    />
                  </div>
                </div>
                {!collapsedCustomFeatures[index] && (
                  <div className="p-4 space-y-4">
                    <div>
                      <Controller
                        name={`customFeatures[${index}].name`}
                        control={control}
                        render={({ field }) => (
                          <InputText
                            {...field}
                            placeholder="e.g. Tiles"
                            onChange={(e) => {
                              field.onChange(e);
                              trigger(`customFeatures[${index}].name`);
                            }}
                            className="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                          />
                        )}
                      />
                      {errors.customFeatures?.[index]?.name && (
                        <p className="text-red-500 text-sm">{errors.customFeatures[index].name.message}</p>
                      )}
                    </div>
                    <div>
                      <Controller
                        name={`customFeatures[${index}].description`}
                        control={control}
                        render={({ field }) => (
                          <InputTextarea
                            {...field}
                            placeholder="e.g. Place is tiled"
                            onChange={(e) => {
                              field.onChange(e);
                              trigger(`customFeatures[${index}].description`);
                            }}
                            className="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                          />
                        )}
                      />
                      {errors.customFeatures?.[index]?.description && (
                        <p className="text-red-500 text-sm">{errors.customFeatures[index].description.message}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}   
          </div>
        </section>
        <Button
          icon="pi pi-plus"
          onClick={addNewFeature}
          className="w-full bg-gray-200 text-sm font-semibold flex items-center justify-center py-3 gap-4 rounded-lg p-2"
        >
          Add More
        </Button>                 
      </div>
    </div>
  )
});

export default PropertyFeatures
