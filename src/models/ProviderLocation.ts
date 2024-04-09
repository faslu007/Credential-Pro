import { Schema, model, Document } from 'mongoose';

interface IProviderLocation extends Document {
    locationName: string;
    address: Schema.Types.ObjectId;
    taxID: string;
    npi: number;
    officeContactName: string;
    phoneNumber: string;
    faxNumber: string;
    emailId: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: Schema.Types.ObjectId;
    updatedBy: Schema.Types.ObjectId;
}

const ProviderLocationSchema = new Schema<IProviderLocation>({
    locationName: { type: String, required: true, trim: true },
    address: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
    taxID: { type: String },
    npi: { type: Number, required: true },
    officeContactName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    faxNumber: { type: String, required: true },
    emailId: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
},{
    timestamps: true
});

const ProviderLocationModel = model<IProviderLocation>('ProviderLocation', ProviderLocationSchema);

export default ProviderLocationModel;