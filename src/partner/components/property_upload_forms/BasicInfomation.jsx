import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { ArrowDown01Icon } from 'hugeicons-react';
import { usePropertyNameCheck } from '../../hooks/usePropertyNameCheck';

const BasicInfomation = forwardRef(({ control, errors }, ref) => {
  const { trigger } = useFormContext();
  const { nameStatus, handleNameCheck } = usePropertyNameCheck();

  const propertyTypes = [
    { label: 'Rental', value: 'RENTAL' },
    { label: 'Apartment', value: 'APARTMENT' },
    { label: 'Hostel', value: 'HOSTEL' },
    { label: 'Hotel', value: 'HOTEL' },
  ];

  useImperativeHandle(ref, () => ({
    validate: async () => {
      const isValid = await trigger([
        'name',
        'description',
        'propertyType',
        'address.street',
        'address.city',
        'address.zip',
        'address.country',
      ]);
      return isValid;
    },
  }));

  useEffect(() => {
    document.title = `Basic Information - Property Upload`;
  })

  return (
    <div className="space-y-4">
      <h1 className="text-[1rem] font-[500]">Basic Information</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-sm">Property Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder='e.g., "MyCrib residents"'
                onChange={(e) => {
                  field.onChange(e); 
                  trigger('name');
                  handleNameCheck(e.target.value);
                }}
                className="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          {nameStatus && !errors.name && (
            <p className={`text-sm ${nameStatus.includes('taken') ? 'text-red-500' : 'text-green-500'}`}>
              {nameStatus}
            </p>
          )}
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm">Country</label>
            <Controller
              name="address.country"
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  placeholder="e.g., Uganda"
                  onChange={(e) => {
                    field.onChange(e);
                    trigger('address.country');
                  }}
                  className="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                />
              )}
            />
            {errors.address?.country && <p className="text-red-500 text-sm">{errors.address.country.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm">City</label>
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  placeholder="e.g., Kampala"
                  onChange={(e) => {
                    field.onChange(e);
                    trigger('address.city');
                  }}
                  className="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                />
              )}
            />
            {errors.address?.city && <p className="text-red-500 text-sm">{errors.address.city.message}</p>}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm">Street</label>
            <Controller
              name="address.street"
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  placeholder="e.g., Plot 24 Kampala Rd"
                  onChange={(e) => {
                    field.onChange(e);
                    trigger('address.street');
                  }}
                  className="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                />
              )}
            />
            {errors.address?.street && <p className="text-red-500 text-sm">{errors.address.street.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm">Postal Code</label>
            <Controller
              name="address.zip"
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  placeholder="e.g., 256"
                  onChange={(e) => {
                    field.onChange(e);
                    trigger('address.zip');
                  }}
                  className="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                />
              )}
            />
            {errors.address?.zip && <p className="text-red-500 text-sm">{errors.address.zip.message}</p>}
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm">Property Type</label>
          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => (
              <Dropdown
                options={propertyTypes}
                value={field.value}
                placeholder="Select type"
                dropdownIcon={<ArrowDown01Icon/>}
                onChange={(e) => {
                  field.onChange(e.value);
                  trigger('propertyType');
                }}
                className="w-full border border-gray-400 rounded-lg focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                panelClassName="border border-gray-400 rounded-lg mt-1"
              />
            )}
          />
          {errors.propertyType && <p className="text-red-500 text-sm">{errors.propertyType.message}</p>}
        </div>
        <div>
          <label className="block mb-1 text-sm">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <InputTextarea
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  trigger('description');
                }}
                className="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
            )}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
      </div>
    </div>
  );
});

export default BasicInfomation;