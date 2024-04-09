import mongoose, { Document, Schema, Types } from 'mongoose';

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface License {
    licenseNumber: string;
    licenseType: string;
    effective: Date;
    expiry: Date;
    uploads: Types.ObjectId[]; // Reference to Uploads model
    comments: Types.ObjectId[]; // Reference to Comment model
}

interface Ownership {
    types: 'entity' | 'individual';
    entityName?: string;
    address?: Types.ObjectId; // Reference to Address model
    incorporationAdditionalDetails?: string; 
    firstName?: string;
    lastName?: string;
    displayName?: string; // Virtual field
    effectiveDate?: Date;
    phone?: string;
    email?: string;
    fax?: string;
    ssn?: string;
    dob?: Date;
    birthCity?: string;
    birthState?: string;
    birthCountry?: string;
    ownershipPercentage?: number;
    driversLicenseNumber?: string;
    driversLicenseState?: string;
    homeAddress?: Types.ObjectId; // Reference to Address model
    timeStamp?: Date;
    updatedBy?: string;
    createdBy?: string;
}

interface IPifGroup extends Document {
    legalBusinessName: string;
    dba?: string;
    taxId?: string;
    npi?: string;
    npiEnumerationDate?: Date;
    taxonomy?: string;
    specialty?: string;
    incorporationDate?: Date;
    incorporationState?: string;
    practiceAddress: Address;
    mailingAddress: Address;
    billingAddress: Address;
    mailingAddressSameAsPractice: boolean;
    billingAddressSameAsPracticeAddress: boolean;
    phone?: string;
    fax?: string;
    email?: string;
    signatoryEmail?: string;
    licenses: License[];
    owners: Ownership[];
}

const addressSchema: Schema = new Schema({
    street: { type: Schema.Types.String, required: true },
    city: { type: Schema.Types.String, required: true },
    state: { type: Schema.Types.String, required: true },
    zip: { type: Schema.Types.String, required: true },
    country: { type: Schema.Types.String, required: true },
});

const licenseSchema: Schema = new Schema({
    licenseNumber: { type: Schema.Types.String, required: true },
    licenseType: { type: Schema.Types.String, required: true },
    effective: { type: Schema.Types.Date, required: true },
    expiry: { type: Schema.Types.Date, required: true },
    uploads: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
});

const ownershipSchema: Schema = new Schema({
    types: { type: Schema.Types.String, enum: ['entity', 'individual'], required: true },
    entityName: Schema.Types.String,
    address: { type: Schema.Types.ObjectId, ref: 'Address' },
    incorporationDetails: Schema.Types.Mixed,
    firstName: Schema.Types.String,
    lastName: Schema.Types.String,
    displayName: Schema.Types.String,
    effectiveDate: Schema.Types.Date,
    phone: Schema.Types.String,
    email: Schema.Types.String,
    fax: Schema.Types.String,
    ssn: Schema.Types.String,
    dob: Schema.Types.Date,
    birthCity: Schema.Types.String,
    birthState: Schema.Types.String,
    birthCountry: Schema.Types.String,
    ownershipPercentage: Schema.Types.Number,
    driversLicenseNumber: Schema.Types.String,
    driversLicenseState: Schema.Types.String,
    homeAddress: { type: Schema.Types.ObjectId, ref: 'Address' },
    uploads: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
    timeStamp: Schema.Types.Date,
    updatedBy: Schema.Types.String,
    createdBy: Schema.Types.String,
});

const liabilityInsuranceSchema = new Schema({
    insuranceCarrier: { type: Schema.Types.String, required: true },
    policyNumber: { type: Schema.Types.String, required: true},
    effectiveDate: { type: Schema.Types.Date, required: true},
    expiryDate: { type: Schema.Types.Date, required: true},
    uploads: [{ type: Schema.Types.ObjectId, ref: 'Uploads'}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments'}]
}, {
    timestamps: true
})

const pifGroupSchema: Schema = new Schema({
    provider: [{ type: Schema.Types.ObjectId, ref: 'Provider' }],
    legalBusinessName: { type: Schema.Types.String, required: true },
    dba: Schema.Types.String,
    taxId: Schema.Types.String,
    npi: Schema.Types.String,
    npiEnumerationDate: Schema.Types.Date,
    taxonomy: Schema.Types.String,
    specialty: Schema.Types.String,
    incorporationDate: Schema.Types.Date,
    incorporationState: Schema.Types.String,
    practiceAddress: { type: addressSchema, required: true },
    mailingAddress: { type: addressSchema, required: true },
    billingAddress: { type: addressSchema, required: true },
    mailingAddressSameAsPractice: Schema.Types.Boolean,
    billingAddressSameAsPracticeAddress: Schema.Types.Boolean,
    liabilityInsurance: [liabilityInsuranceSchema],
    phone: Schema.Types.String,
    fax: Schema.Types.String,
    email: Schema.Types.String,
    signatoryEmail: Schema.Types.String,
    licenses: [licenseSchema],
    owners: [ownershipSchema],
    bankInformation: {
        bankName: { type: Schema.Types.String },
        accountNumber: { type: Schema.Types.String },
        routingNumber: { type: Schema.Types.String },
        bankContact: { type: Schema.Types.String },
    },
    uploads: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
});

const BusinessModel = mongoose.model<IPifGroup>('PifGroup', pifGroupSchema);

export default BusinessModel;
