import { Schema, model, Document } from 'mongoose';
import { ProviderAccountType } from '../Commons/CommonEums';

export interface IProvider extends Document {
    providerDisplayName: string;
    providerAccountType: ProviderAccountType;
    billingAccount: Schema.Types.ObjectId;
    associateProviders: string[];
    pifGroupOrFacility: Schema.Types.ObjectId;
    pifIndividual: Schema.Types.ObjectId;
    status: boolean;
    multipleLocations: boolean;
    locations: string[];
    createdBy: Schema.Types.ObjectId;
    updatedBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ProviderSchema = new Schema<IProvider>({
    providerDisplayName: {
        type: String,
        required: true,
    },
    providerAccountType: {
        type: String,
        enum: Object.values(ProviderAccountType),
        required: true,
    },
    billingAccount: {
        type: Schema.Types.ObjectId,
        ref: 'BillingAccount',
    },
    associateProviders: [{
        type: Schema.Types.ObjectId,
        ref: 'ProviderAssociate',
    }],
    pifGroupOrFacility: {
        type: Schema.Types.ObjectId,
        ref: 'PifGroup',
    },
    pifIndividual: {
        type: Schema.Types.ObjectId,
        ref: 'PifIndividual',
    },
    multipleLocations: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: true,
    },
    locations: [{
        type: Schema.Types.ObjectId,
        ref: 'ProviderLocation',
    }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
});

const ProviderModel = model<IProvider>('Provider', ProviderSchema);

export default ProviderModel;