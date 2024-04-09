import { Schema, Document, model } from 'mongoose';

// Define interfaces for nested objects
interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

interface EducationDetails {
    fromMonth: string;
    fromYear: number;
    toMonth: string;
    toYear: number;
}

interface ProfessionalTrainingDetails {
    fromMonth: string;
    fromYear: number;
    toMonth: string;
    toYear: number;
}

interface AdmittingPrivileges {
    startDate: Date;
    expiryDate: Date;
}

interface EmploymentDetails {
    employmentDateRange: {
        fromMonth: string;
        fromYear: number;
        toMonth: string;
        toYear: number;
    };
    affiliationDateRange: {
        fromMonth: string;
        fromYear: number;
        toMonth: string;
        toYear: number;
    };
}

// Define sub-document schemas
const AddressSchema = new Schema<Address>({
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
});

const AttendanceDateRangeSchema = new Schema({
    fromMonth: String,
    fromYear: Number,
    toMonth: String,
    toYear: Number
});

// Define main schema
const PifIndividualSchema = new Schema({
    provider: [{type: Schema.Types.ObjectId, ref: 'Provider'}],
    associateProvider: [{ type: Schema.Types.ObjectId, ref: 'AssociateProvider' }],
    firstName: String,
    middleName: String,
    lastName: String,
    homeAddress: AddressSchema,
    mailingAddress: AddressSchema,
    mailingAddressSameAsHome: Boolean,
    email: String,
    phone: String,
    ssn: String,
    gender: String,
    dob: Date,
    birthCity: String,
    birthState: String,
    birthCountry: String,
    raceOrEthnicity: String,
    languages: [String],
    professionalLicenses: [{
        licenseId: String,
        licenseState: String,
        effectiveDate: Date,
        expiryDate: Date,
        licenseType: String,
        uploads: [{ type: Schema.Types.ObjectId, ref: 'Upload' }]
    }],
    dea: [{
        deaNumber: String,
        licenseState: String,
        effectiveDate: Date,
        expiryDate: Date,
        uploads: [{ type: Schema.Types.ObjectId, ref: 'Upload' }]
    }],
    cds: [{
        cdsNumber: String,
        state: String,
        effectiveDate: Date,
        expiryDate: Date,
        uploads: [{ type: Schema.Types.ObjectId, ref: 'Upload' }]
    }],
    medicaid: Schema.Types.Mixed,
    medicare: Schema.Types.Mixed,
    education: [{
        educationType: String,
        country: String,
        state: String,
        county: String,
        institutionOrSchoolName: String,
        degree: String,
        attendanceDateRange: AttendanceDateRangeSchema,
        currentlyAttending: Boolean,
        uploads: [{ type: Schema.Types.ObjectId, ref: 'Upload' }]
    }],
    professionalTraining: [{
        trainingType: String,
        otherTrainingType: String,
        institutionOrFacilityName: String,
        affiliatedUniversity: String,
        attendanceDateRange: AttendanceDateRangeSchema,
        currentlyAttending: Boolean,
        uploads: [{ type: Schema.Types.ObjectId, ref: 'Upload' }]
    }],
    specialtyAndBoardCertificationDetails: [{
        specialtyPriority: String,
        specialty: String,
        specialtyTaxonomy: String,
        boardCertified: Boolean,
        certifyingBoard: String,
        initialCertificationDate: Date,
        expiryDate: Date,
        lastRecertificationDate: Date,
        uploads: [{ type: Schema.Types.ObjectId, ref: 'Upload' }]
    }],
    admittingPrivileges: [{
        state: String,
        country: String,
        hospitalName: String,
        isThisPrimaryHospital: Boolean,
        admittingPrivilegeStatus: String,
        admittingPrivilegeType: String,
        department: String,
        admittingPrivilegeDates: AttendanceDateRangeSchema,
        uploads: [{ type: Schema.Types.ObjectId, ref: 'Upload' }]
    }],
    admittingArrangements: [{
        details: Schema.Types.Mixed,
        uploads: [{ type: Schema.Types.ObjectId, ref: 'Upload' }]
    }],
    professionalLiabilityInsurance: [{
        policyNumber: String,
        coveredPractices: Schema.Types.Mixed,
        effective: Date,
        expiry: Date,
        originalExpiry: Date,
        carrierName: String,
        carrierAddress: Schema.Types.Mixed,
        carrierPhone: String,
        carrierFax: String,
        hasUnlimitedCoverage: Boolean,
        typeOfCoverage: String,
        coveragePerOccurrence: Number,
        coveragePerAggregate: Number,
        hasMadeAnyClaims: Boolean
    }],
    employmentDetails: [{
        practiceOrEmployerName: String,
        departmentOrSpecialty: String,
        address: AddressSchema,
        employmentDates: AttendanceDateRangeSchema
    }],
    uploads: [{ type: Schema.Types.ObjectId, ref: 'Upload' }],
    providerType: String,
    practicingStates: [String],
});

// Define and export the models
export interface Provider extends Document {
    firstName: string;
    middleName: string;
    lastName: string;
}

export const ProviderModel = model<Provider>('PifIndividual', PifIndividualSchema);