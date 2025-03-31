import React, { useState, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PartnerHeader from '../components/PartnerHeader';
import Footer from '../../client/components/global/Footer';
import { ArrowLeft02Icon } from 'hugeicons-react';
import { Link, useNavigate } from 'react-router-dom';
import BasicInfomation from '../components/property_upload_forms/BasicInfomation';
import AddUnits from '../components/property_upload_forms/AddUnits';
import PropertyFeatures from '../components/property_upload_forms/PropertyFeatures';
import UploadMedia from '../components/property_upload_forms/UploadMedia';
import Preview from '../components/property_upload_forms/Preview';
import PropertySchema from '../components/form_schemas/PropertyUploadFormSchema';
import propertyUploadDefaultValues from '../components/default_values/PropertyUploadDefaultValues';
import Spinner from '../../globals/ui/Spinner';
import api_urls from '../../client/utils/resources/api_urls';
import { getUserToken } from '../../client/utils/cookies/AuthCookiesManager';
import UnitDetails from '../../client/components/details/UnitDetails';

const NewProperty = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const basicInfoRef = useRef(null);
  const addUnitsRef = useRef(null);
  const propertyFeaturesRef = useRef(null);
  const uploadMediaRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({ success: false, message: '' });

  const methods = useForm({
    resolver: zodResolver(PropertySchema),
    defaultValues: propertyUploadDefaultValues,
  });

  const { control, handleSubmit, formState: { errors }, getValues, setValue } = methods;

  const handleNext = async () => {
    let isValid = false;
    // console.log(getValues());

    if (step === 1 && basicInfoRef.current) {
      isValid = await basicInfoRef.current.validate();
    } else if (step === 2 && addUnitsRef.current) {
      isValid = await addUnitsRef.current.validate();
    } else if (step === 3 && propertyFeaturesRef.current) {
      isValid = await propertyFeaturesRef.current.validate();
    } else if (step === 4 && uploadMediaRef.current) {
      isValid = await uploadMediaRef.current.validate();
    } 
    else if (step === 5) {
      // On Step 5, validate the entire form
      handleSubmit((data) => {
          setCompleted(true);
          onSubmit(data);
        },
        // (err) => {
        //   console.log('Final submission validation errors:', err);
        // }
      )();
      return; // Exit early since we're submitting
    }

    if (isValid) {
      setStep(step + 1);
    } else {
      console.log('Validation errors:', errors);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const _handleSubmit = async () => {
    setIsSubmitting(true);
    const propertyDetails = getValues();
    if(propertyDetails.unitsAvailable) {
      setValue('unitlessDetails', null);
    } else {
      setValue('units', []);
    }
    console.log('Property Details:', propertyDetails);

    const formData = new FormData();
    const { media, ...filteredPropertyDetails } = propertyDetails;
    const { photos, videos, threeDTour, ...filteredMedia } = media;
    
    filteredPropertyDetails.media = filteredMedia;

    formData.append('property', JSON.stringify(filteredPropertyDetails));

    photos.forEach((photo) => {
      formData.append('photos', photo);
    });
  
    videos.forEach((video) => {
      formData.append('videos', video);
    });
  
    if (threeDTour) {
      formData.append('threeDTour', threeDTour);
    }

    console.log('Form Data:', formData);
  try {
    const response = await fetch(api_urls.listings.create_listing, {
      method: 'POST',
      body: formData,
      headers: {
        ContentType: 'multipart/form-data',
        Authorization: `Bearer ${getUserToken()}`,
      },
    });

    const result = await response.json();
    console.log('Upload Response:', result);

    if (response.ok) {
      setSubmissionStatus({ success: true, message: 'Property submitted for review. You will be notified upon approval' });
    } else {
      throw new Error(result.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Error uploading property:', error);
    alert('Error uploading property. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
  };

  return (
    <FormProvider {...methods}>
      <div className="relative h-[100vh] overflow-y-auto">
        <section className="sticky top-0 z-50">
          <PartnerHeader bottomBorder />
        </section>

        <section className="px-[8vw] py-[2vw] flex items-center gap-6">
          <Link to={-1}>
            <ArrowLeft02Icon />
          </Link>
          <article className="font-bold text-xl">Add property</article>
        </section>

        <section className="mx-[8vw] flex gap-8">
          <section className="bg-blue-50 bg-opacity-40 p-6 text-sm w-[20vw] space-y-6 rounded-lg">
            <div className="text-gray-400">
              <p className={`${step === 1 ? 'text-primary' : step > 1 ? 'text-gray-700' : ''} flex items-center gap-4`}>
                Step 1/5{' '}
                <span className={`${step > 1 ? 'font-extrabold text-green-500' : 'hidden'}`}>
                  <i className="pi pi-check font-extrabold" />
                </span>
              </p>
              <p className={`${step >= 1 ? 'text-black' : ''}`}>Basic information</p>
            </div>
            <div className="text-gray-400">
              <p className={`${step === 2 ? 'text-primary' : step > 2 ? 'text-gray-700' : ''} flex items-center gap-4`}>
                Step 2/5{' '}
                <span className={`${step > 2 ? 'font-extrabold text-green-500' : 'hidden'}`}>
                  <i className="pi pi-check font-extrabold" />
                </span>
              </p>
              <p className={`${step >= 2 ? 'text-black' : ''}`}>Add Units</p>
            </div>
            <div className="text-gray-400">
              <p className={`${step === 3 ? 'text-primary' : step > 3 ? 'text-gray-700' : ''} flex items-center gap-4`}>
                Step 3/5{' '}
                <span className={`${step > 3 ? 'font-extrabold text-green-500' : 'hidden'}`}>
                  <i className="pi pi-check font-extrabold" />
                </span>
              </p>
              <p className={`${step >= 3 ? 'text-black' : ''}`}>Property Features</p>
            </div>
            <div className="text-gray-400">
              <p className={`${step === 4 ? 'text-primary' : step > 4 ? 'text-gray-700' : ''} flex items-center gap-4`}>
                Step 4/5{' '}
                <span className={`${step > 4 ? 'font-extrabold text-green-500' : 'hidden'}`}>
                  <i className="pi pi-check font-extrabold" />
                </span>
              </p>
              <p className={`${step >= 4 ? 'text-black' : ''}`}>Upload Media</p>
            </div>
            <div className="text-gray-400">
              <p className={`${step >= 5 ? 'text-primary' : ''} flex items-center gap-4`}>
                Step 5/5{' '}
              </p>
              <p className={`${step === 5 ? 'text-black' : ''}`}>Preview</p>
            </div>
          </section>

          <section className={`w-[35vw] ${step === 5 && 'w-[50vw]'}`}>
            {step === 1 && <BasicInfomation ref={basicInfoRef} control={control} errors={errors} />}
            {step === 2 && <AddUnits ref={addUnitsRef} control={control} errors={errors} setValue={setValue} />}
            {step === 3 && <PropertyFeatures ref={propertyFeaturesRef} control={control} errors={errors} setValue={setValue} />}
            {step === 4 && <UploadMedia ref={uploadMediaRef} control={control} errors={errors} setValue={setValue} />}
            {step === 5 && <Preview formData={getValues()} />}
            <section className="flex justify-between items-center mt-8">
              <button onClick={handlePrevious} className="text-black font-semibold p-2 rounded-lg">
                Back
              </button>
              <button
                onClick={handleNext}
                className={`${step === 5 ? 'hidden' : ''} bg-primary font-semibold text-white px-8 py-2 rounded-lg`}
              >
                Next
              </button>
              <button
                onClick={_handleSubmit}
                className={`${step !== 5 ? 'hidden' : ''} bg-primary font-semibold text-white px-8 py-2 rounded-lg`}
              >
                { isSubmitting ? <Spinner/> : "Submit for approval"}
              </button>
            </section>
          </section>
        </section>

        <section className="pt-[4vh]">
          <Footer />
        </section>
      </div>
    </FormProvider>
  );
};

export default NewProperty;