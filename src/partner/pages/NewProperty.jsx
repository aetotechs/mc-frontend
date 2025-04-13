import React, { useState, useRef, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PartnerHeader from '../components/PartnerHeader';
import Footer from '../../client/components/global/Footer';
import { ArrowLeft02Icon } from 'hugeicons-react';
import { Link, useSearchParams } from 'react-router-dom';
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
import { decryptParams, encryptParams } from '../../client/utils/helpers/EncryptionHelper';
import CustomToast from '../../client/components/ui/CustomToast';

const NewProperty = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const basicInfoRef = useRef(null);
  const addUnitsRef = useRef(null);
  const propertyFeaturesRef = useRef(null);
  const uploadMediaRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({ success: false, message: '' });
  const [toastVisible, setToastVisible] = useState(false);
  const [step, setStep] = useState(() => {
    const savedStep = searchParams.get("_uploadFormStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const methods = useForm({
    resolver: zodResolver(PropertySchema),
    defaultValues: decryptParams(searchParams.get('_newProperty')) || propertyUploadDefaultValues,
  });

  const { control, reset, handleSubmit, formState: { errors }, getValues, setValue } = methods;

  useEffect(() => {
    if (submissionStatus.message) {
      setToastVisible(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const timer = setTimeout(() => {
        setSubmissionStatus({ success: false, message: '' });
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  const handleNext = async () => {
    let isValid = false;

    if (step === 1 && basicInfoRef.current) {
      isValid = await basicInfoRef.current.validate();
    } else if (step === 2 && addUnitsRef.current) {
      isValid = await addUnitsRef.current.validate();
    } else if (step === 3 && propertyFeaturesRef.current) {
      isValid = await propertyFeaturesRef.current.validate();
    } else if (step === 4 && uploadMediaRef.current) {
      isValid = await uploadMediaRef.current.validate();
    } else if (step === 5) {
      handleSubmit((data) => {
        _handleSubmit(data); // Call _handleSubmit directly
      })();
      return;
    }

    if (isValid) {
      const nextStep = step + 1;
      setStep(nextStep);

      searchParams.set("_newProperty", encryptParams(getValues()));
      searchParams.set("_uploadFormStep", nextStep.toString());
      setSearchParams(searchParams);
    } else {
      console.log('Validation errors:', errors);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      searchParams.set("_uploadFormStep", (step - 1).toString());
      setSearchParams(searchParams);
    }
  };

  const _handleSubmit = async () => {
    setIsSubmitting(true);
    const propertyDetails = getValues();

    if (propertyDetails.unitsAvailable) {
      setValue('unitlessDetails', null);
    } else {
      setValue('units', []);
    }

    console.log('Submitting property details:', propertyDetails);

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

    try {
      const response = await fetch(api_urls.listings.create_listing, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });

      
      if (response.ok) {
        const result = await response.json();
        console.log('Upload Response:', result);
        setSubmissionStatus({
          success: true,
          message: result.message || 'Property submitted for review. You will be notified upon approval',
        });
        reset();
        setStep(1);
        searchParams.delete("_uploadFormStep");
        searchParams.delete("_newProperty");
        setSearchParams(searchParams);
      } else {
        const errorText = await response.text();
        setSubmissionStatus({
          success: false,
          message: errorText || 'Error uploading property. Please try again.',
        });
        console.error('Error uploading property:', errorText);
      }
    } catch (error) {
      setSubmissionStatus({
        success: false,
        message: error.message || 'Error uploading property. Please try again.',
      });
      console.error('Error uploading property:', error);
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

        <section className='px-[8vw] py-[2vw] flex justify-between items-center'>
          <section className="flex items-center gap-6">
            <Link to={-1}>
              <ArrowLeft02Icon />
            </Link>
            <article className="font-bold text-xl">Add property</article>
          </section>
          <CustomToast
            message={submissionStatus.message}
            type={submissionStatus.success ? 'success' : 'error'}
            visible={toastVisible}
            onHide={() => setToastVisible(false)}
            autoHide={true}
            duration={20000}
          />
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
              <button
                onClick={handlePrevious}
                className="text-black font-semibold p-2 min-h-12 rounded-lg"
                disabled={step === 1}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className={`${step === 5 ? 'hidden' : ''} bg-primary font-semibold text-white px-8 min-h-12 rounded-lg`}
              >
                Next
              </button>
              <button
                onClick={_handleSubmit}
                className={`${step !== 5 ? 'hidden' : ''} bg-primary font-semibold text-white min-w-[30%] min-h-12 px-8 py-2 rounded-lg`}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner size={7} color="white" /> : "Submit for approval"}
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