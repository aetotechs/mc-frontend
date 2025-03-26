import { z } from 'zod';

const PropertyTypeEnum = z.enum(['RENTAL', 'APARTMENT', 'HOSTEL', 'HOTEL']);
const AvailableEnum = z.enum(['AVAILABLE', 'UNAVAILABLE']);
const PaymentCycleEnum = z.enum(['SECOND', 'MINUTE', 'HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR', 'DECADE', 'CENTURY']);

const UnitlessDetailsSchema = z.object({
  price: z.number().min(0, 'Price cannot be negative'),
  paymentCycle: PaymentCycleEnum,
  size: z.string().optional(),
  bedRooms: z.number().min(0, 'Number of bedrooms cannot be negative'),
  bathRooms: z.number().min(0, 'Number of bathrooms cannot be negative'),
  available: AvailableEnum.default('AVAILABLE'),
});

const PaymentCycleSchema = z.object({
  name: PaymentCycleEnum,
  number: z.number().min(1, 'Number of payment cycles cannot be less than 1'),
  description: z.string().min(1, 'Payment cycle description is required').max(3000, 'Payment cycle description cannot exceed 3000 characters'),
});

const MediaDataSchema = z.object({
  photos: z.array(z.string()).min(1, 'At least one photo is required').max(20, 'Maximum 20 photos allowed'),
  videos: z.array(z.string()).min(0, 'At least one video is required').max(5, 'Maximum 5 videos allowed'),
  threeDTour: z.string().optional(),
  threeDTourLink: z.string().url('Must be a valid link starting with https://').optional(),
});

const PropertyUnitSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0, 'Price cannot be negative'),
  media: MediaDataSchema.optional(),
  paymentCycle: PaymentCycleSchema.optional(),
  size: z.string().optional(),
  bedRooms: z.number().min(0, 'Number of bedrooms cannot be negative'),
  bathRooms: z.number().min(0, 'Number of bathrooms cannot be negative'),
  available: AvailableEnum.default('AVAILABLE'),
});

const AmenitiesSchema = z.object({
  security: z.boolean(),
  airConditioning: z.boolean(),
  gym: z.boolean(),
  parking: z.boolean(),
  internet: z.boolean(),
  pool: z.boolean(),
  maintenance: z.boolean(),
  fireUnit: z.boolean(),
  swimmingPool: z.boolean(),
  laundryServices: z.boolean(),
  sports: z.boolean(),
});

const CustomFeatureSchema = z.object({
  name: z.string().min(1, 'Feature name is required').max(100, 'Feature name cannot exceed 100 characters'),
  description: z.string().min(1, 'Feature description is required').max(3000, 'Feature description cannot exceed 3000 characters'),
});

const AddressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
});

const PropertySchema = z.object({
  name: z.string().min(1, 'Property name is required'),
  owner: z.string().min(1, 'Owner is required'),
  description: z.string().max(5000, 'Description cannot exceed 5000 characters').optional(),
  propertyArea: z.string().optional(),
  parkingCapacity: z.string().optional(),
  unitlessDetails: UnitlessDetailsSchema.optional(),
  propertyType: PropertyTypeEnum,
  unitsAvailable: z.boolean().default(false),
  units: z.array(PropertyUnitSchema).optional(),
  amenities: AmenitiesSchema.optional(),
  customFeatures: z.array(CustomFeatureSchema).optional(),
  media: MediaDataSchema,
  address: AddressSchema,
  status: z.enum(['draft', 'submitted']).default('draft'),
}).superRefine((data, ctx) => {
  // Validate units vs unitlessDetails based on unitsAvailable
  if (data.unitsAvailable) {
    if (!data.units || data.units.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['units'],
        message: 'At least one unit is required when units are available',
      });
    }
    if (data.unitlessDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['unitlessDetails'],
        message: 'Unitless details should not be provided when units are available',
      });
    }
  } else {
    if (!data.unitlessDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['unitlessDetails'],
        message: 'Unitless details are required when units are not available',
      });
    }
    if (data.units && data.units.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['units'],
        message: 'Units should not be provided when units are not available',
      });
    }
  }
});

export default PropertySchema;