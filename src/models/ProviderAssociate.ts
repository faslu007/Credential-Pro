import { Schema, Document, model } from 'mongoose';

interface IProviderAssociate extends Document {
    providerDisplayName: string;
    parentProvider: Schema.Types.ObjectId;
    pifIndividual: Schema.Types.ObjectId;
    status: boolean;
    locations: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}

const ProviderAssociateSchema = new Schema<IProviderAssociate>({
    providerDisplayName: {
        type: String,
        required: true,
    },
    parentProvider: {
        type: Schema.Types.ObjectId,
        ref: 'Provider',
        required: true,
    },
    pifIndividual: {
        type: Schema.Types.ObjectId,
        ref: 'PifIndividual',
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    locations: [{
        type: Schema.Types.ObjectId,
        ref: 'ProviderLocations',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: String,
        required: true,
    },
});

const ProviderAssociateModel = model<IProviderAssociate>('ProviderAssociate', ProviderAssociateSchema);

export default ProviderAssociateModel;