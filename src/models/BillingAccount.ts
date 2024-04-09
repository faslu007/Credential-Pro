import mongoose, { Document, Schema, CallbackError } from 'mongoose';
import { BillingAccountPlan } from '../Commons/CommonEums';

export interface IBillingAccount extends Document {
    customId: number;
    providers: Schema.Types.ObjectId[];
    billingAccountName: string;
    secureCredentialKey: string;
    currentPlan: BillingAccountPlan;
    currentPlanDue: Date;
    providerIds: Schema.Types.ObjectId[];
    address: Schema.Types.ObjectId[];
    createdBy: Schema.Types.ObjectId;
    updatedBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const AgileBoardStatusSchema = new Schema({
    id: Number,
    value: String,
    label: String
}); 

const BillingAccountSchema: Schema = new Schema({
    customId: { type: Number, required: true, unique: true, auto: true },
    billingAccountName: { type: String, required: true, unique: true },
    address: { type: Schema.Types.ObjectId, ref: 'Address' },
    providers: [{ type: Schema.Types.ObjectId, ref: 'Provider' }],
    secureCredentialKey: { type: String, required: true },
    agileBoardStatusList: { type: [AgileBoardStatusSchema], default: [{ value: 'toDo', label: 'To-Do' }, { value: 'inProcess', label: 'In progress' }, { value: 'blocked', label: 'Blocked' }, { value: 'done', label: 'Done' }] },
    currentPlan: { type: String, enum: Object.values(BillingAccountPlan), required: true },
    currentPlanDue: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
});

// Custom pre-save middleware to auto-increment 'customId'
BillingAccountSchema.pre<IBillingAccount>('save', async function (next) {
    if (this.isNew) {
        try {
            // Find the maximum 'customUserId' in the collection
            const highestCustomId = await (this.constructor as any).findOne()
                .sort({ customId: -1 })
                .select('customId')
                .lean()
                .exec() as { customId: number };

            // Increment 'customId' for the new document
            this.customId = (highestCustomId ? highestCustomId.customId : 0) + 1;
            next();
        } catch (error) {
            next(error as CallbackError);
        }
    } else {
        next();
    }
});


export default mongoose.model<IBillingAccount>('BillingAccount', BillingAccountSchema);