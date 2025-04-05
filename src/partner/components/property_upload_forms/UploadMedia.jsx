import { Image01Icon, Video01Icon, VirtualRealityVr02Icon } from 'hugeicons-react';
import { InputText } from 'primereact/inputtext';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const UploadMedia = forwardRef(({ control, errors, setValue }, ref) => {
  const { trigger, watch } = useFormContext();
  const [activeTab, setActiveTab] = useState('Photos');
  const tabs = ['Photos', 'Videos', '3D Tour'];

  const sectionsRef = {
    Photos: useRef(),
    Videos: useRef(),
    '3D Tour': useRef(),
  };

  useImperativeHandle(ref, () => ({
    validate: async () => {
      const isValid = await trigger([
        'media.photos',
        'media.videos',
        'media.threeDTour',
        'media.threeDTourLink',
      ]);
      return isValid;
    },
  }));

  useEffect(() => {
    document.title = `Upload overall property media`;
  }, []);

  const isValidFile = (file) => file instanceof File;

  return (
    <div className="space-y-4">
      <h1 className='text-[1.2rem] font-[500]'>Upload Media</h1>
      <p className='font-normal text-gray-500'>
        Add General photos, videos and 3D Tour to make your listing stand out. <br />
        <span className="text-red-500 text-xs">
          Note: Uploaded files will be cleared if you refresh the page.
        </span>
      </p>

      <div className="flex gap-10 text-[15px] py-2">
        {tabs.map((tab) => (
          <div key={tab} className="relative">
            <h4
              className={`cursor-pointer ${activeTab === tab ? "text-primary font-semibold" : ""}`}
              onClick={() => {
                sectionsRef[tab].current?.scrollIntoView({ behavior: "smooth" });
                setActiveTab(tab);
              }}
            >
              {tab}
            </h4>
            {activeTab === tab && (
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-6 h-[3px] bg-primary rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      <section className='space-y-4'>
        <section className='space-y-4' ref={sectionsRef.Photos}>
          <h2 className='text-[1.2rem] font-[500]'>Photos</h2>
          <div className="col-span-3">
            <Controller
              name={`media.photos`}
              control={control}
              render={({ field }) => (
                <div className="">
                  <div className='text-center border-2 border-dashed border-gray-200 rounded-lg p-4'>
                    <div className='text-4xl w-full flex justify-center items-center p-4'>
                      <Image01Icon size={32} />
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                      <label htmlFor={`photo-upload-general`} className="text-blue-500 underline cursor-pointer">
                        Upload
                      </label>
                      <p className='text-black'>Photos</p>
                    </div>
                    <input
                      id={`photo-upload-general`}
                      type="file"
                      multiple
                      accept="image/jpeg,image/png"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const newFiles = [...(field.value || []), ...files];
                        field.onChange(newFiles);
                        trigger(`media.photos`);
                      }}
                    />
                    <p className="text-sm text-gray-500 mt-1">Supports JPEG, PNG; max 5MB per file</p>
                  </div>
                  {field.value?.length > 0 && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {field.value.map((photo, idx) => (
                        isValidFile(photo) ? (
                          <div key={idx} className="relative">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="Uploaded"
                              className="w-20 h-20 object-cover rounded-lg"
                              onError={(e) => (e.currentTarget.src = '')} // Fallback if URL fails
                            />
                            <button
                              onClick={() => {
                                const updatedFiles = field.value.filter((_, i) => i !== idx);
                                field.onChange(updatedFiles);
                                trigger(`media.photos`);
                              }}
                              className="absolute top-1 right-1 bg-gray-200 rounded-full p-1 flex justify-center items-center"
                            >
                              <i className='pi pi-times text-[8px]' />
                            </button>
                          </div>
                        ) : null
                      ))}
                    </div>
                  )}
                </div>
              )}
            />
            {errors.media?.photos && (
              <p className="text-red-500 text-sm">{errors.media.photos.message}</p>
            )}
          </div>
        </section>

        <section className='space-y-4' ref={sectionsRef.Videos}>
          <h2 className='text-[1.2rem] font-[500] mt-8'>Videos</h2>
          <div className="col-span-3">
            <Controller
              name={`media.videos`}
              control={control}
              render={({ field }) => (
                <div className="">
                  <div className='text-center border-2 border-dashed border-gray-200 rounded-lg p-4'>
                    <div className='text-4xl w-full flex justify-center items-center p-4'>
                      <Video01Icon size={32} />
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                      <label htmlFor={`video-upload-general`} className="text-blue-500 underline cursor-pointer">
                        Upload
                      </label>
                      <p className='text-black'>videos</p>
                    </div>
                    <input
                      id={`video-upload-general`}
                      type="file"
                      multiple
                      accept="video/mp4"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const newFiles = [...(field.value || []), ...files];
                        field.onChange(newFiles);
                        trigger(`media.videos`);
                      }}
                    />
                    <p className="text-sm text-gray-500 mt-1">Supports MP4; max 10MB</p>
                  </div>
                  {field.value?.length > 0 && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {field.value.map((vid, idx) => (
                        isValidFile(vid) ? (
                          <div key={idx} className="relative">
                            <video
                              src={URL.createObjectURL(vid)}
                              controls
                              className="w-20 h-20 object-cover rounded-lg"
                              onError={(e) => (e.currentTarget.src = '')} // Fallback if URL fails
                            />
                            <button
                              onClick={() => {
                                const updatedFiles = field.value.filter((_, i) => i !== idx);
                                field.onChange(updatedFiles);
                                trigger(`media.videos`);
                              }}
                              className="absolute top-1 right-1 bg-gray-200 rounded-full p-1 flex justify-center items-center"
                            >
                              <i className='pi pi-times text-[8px]' />
                            </button>
                          </div>
                        ) : null
                      ))}
                    </div>
                  )}
                </div>
              )}
            />
            {errors.media?.videos && (
              <p className="text-red-500 text-sm">{errors.media.videos.message}</p>
            )}
          </div>
        </section>

        <section className='space-y-4 opacity-50' ref={sectionsRef['3D Tour']}>
          <h2 className='text-[1.2rem] font-[500] mt-8'>3D Tour <span className='text-red-500 text-xs'>(Not yet available)</span></h2>
          <div className="col-span-3">
            <Controller
              name={`media.threeDTour`}
              control={control}
              render={({ field }) => (
                <div className="">
                  <div className='text-center border-2 border-dashed border-gray-200 rounded-lg p-4'>
                    <div className='text-4xl w-full flex justify-center items-center p-4'>
                      <VirtualRealityVr02Icon size={32} />
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                      <label
                        className="text-blue-500 underline cursor-pointer"
                      >
                        Upload
                      </label>
                      <p className='text-black'> file</p>
                    </div>
                    <input
                      id={`threedtour-upload-general`}
                      type="file"
                      accept="model/gltf-binary,model/gltf+json"
                      className="hidden"
                      onChange={(e) => {
                        field.onChange(e.target.files[0]);
                        trigger(`media.threeDTour`);
                      }}
                    />
                    <p className="text-sm text-gray-500 mt-1">Supports .glb, .obj; max 10MB</p>
                  </div>
                  {field.value && isValidFile(field.value) && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(field.value)}
                          alt="Uploaded"
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => (e.currentTarget.src = '')} 
                        />
                        <button
                          onClick={() => {
                            field.onChange(null);
                            trigger(`media.threeDTour`);
                          }}
                          className="absolute top-1 right-1 bg-gray-200 rounded-full p-1 flex justify-center items-center"
                        >
                          <i className='pi pi-times text-[8px]' />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            />
            {errors.media?.threeDTour && (
              <p className="text-red-500 text-sm">{errors.media.threeDTour.message}</p>
            )}
          </div>
        </section>

        <section>
          <div>
            <Controller
              name={`media.threeDTourLink`}
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  placeholder="e.g. https://my-3d-tour.com/kia-apartments-3d-tour"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    trigger(`media.threeDTourLink`);
                  }}
                  className="w-full border border-gray-400 rounded-lg p-3 placeholder:text-sm focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                />
              )}
            />
            {errors.media?.threeDTourLink && (
              <p className="text-red-500 text-sm">{errors?.media?.threeDTourLink?.message}</p>
            )}
          </div>
        </section>
      </section>
    </div>
  );
});

export default UploadMedia;