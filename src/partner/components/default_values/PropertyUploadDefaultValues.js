const propertyUploadDefaultValues = {
    name: '',
    owner: '',
    description: '',
    propertyArea: '',
    parkingCapacity: '',
    unitlessDetails: {
      price: 0,
      paymentCycle: 'MONTHLY',
      size: '',
      bedRooms: 0,
      bathRooms: 0,
      available: 'AVAILABLE',
    },
    propertyType: 'RENTAL',
    unitsAvailable: true,
    units: [
      {
        name: '',
        description: '',
        price: 0,
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
        size: '',
        bedRooms: 0,
        bathRooms: 0,
        available: 'AVAILABLE',
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
      threeDTour: '',
      threeDTourLink: '',
    },
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
    status: 'draft',
  };
  
  export default propertyUploadDefaultValues;