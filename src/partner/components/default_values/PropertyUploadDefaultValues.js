const propertyUploadDefaultValues = {
    name: '',
    owner: '',
    description: '',
    propertyArea: '',
    parkingCapacity: '',
    unitlessDetails: {
      price: null,
      paymentCycle: '',
      size: '',
      bedRooms: null,
      bathRooms: null,
      available: '',
    },
    propertyType: '',
    unitsAvailable: true,
    units: [
      {
        name: '',
        description: '',
        price: null,
        size: '',
        bedRooms: null,
        bathRooms: null,
        available: '',
        media: {
          photos: [],
          videos: [],
          threeDTour: '',
          threeDTourLink: '',
        },
        paymentCycle: {
            name: '', // e.g. ['MONTHLY', 'YEARLY']
            number: 1,
            description: '', // e.g. 'Payment is made every month'
        },
      },
    ],
    amenities: {
      security: false,
      airConditioning: false,
      gym: false,
      parking: false,
      internet: false,
      pool: false,
      maintenance: false,
      fireUnit: false,
      swimmingPool: false,
      laundryServices: false,
      sports: false,
    },
    customFeatures: [],
    media: {
      photos: [],
      videos: [],
      threeDTour: null,
      threeDTourLink: null,
    },
    address: {
      street: '',
      city: '',
      state: 'UG',
      zip: '',
      country: '',
    },
  };
  
  export default propertyUploadDefaultValues;