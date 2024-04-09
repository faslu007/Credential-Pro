import { Schema, model, Document, CallbackError } from 'mongoose';
import { payerType } from '../Commons/CommonEums';

// Define the Payer interface
interface IPayer extends Document {
    customId: number;
    payerName: string;
    payerType: payerType;
    address: Schema.Types.ObjectId;
    payerWebsite?: string;
    payerFax?: string;
    payerContactName?: string;
    payerPhone?: string;
    customFieldValues?: Record<string, any>;
    uploads: Schema.Types.ObjectId[];
    comments: Schema.Types.ObjectId[];
    createdBy: Schema.Types.ObjectId;
    updatedBy: Schema.Types.ObjectId;
    payerState: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Payer schema
const PayerSchema = new Schema<IPayer>({
    customId: {
        type: Number,
        required: true,
        unique: true,
        autoIncrement: true,
    },
    payerName: {
        type: String,
        required: true,
    },
    payerType: {
        type: String,
        required: true,
        enum: Object.values(payerType),
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    payerWebsite: {
        type: String,
    },
    payerFax: {
        type: String,
    },
    payerContactName: {
        type: String,
    },
    payerPhone: {
        type: String,
    },
    payerState: {
        type: String,
    },
    customFieldValues: {
        type: Schema.Types.Mixed,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    uploads: [{
        type: Schema.Types.ObjectId,
        ref: 'Upload',
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
});


// Custom pre-save middleware to auto-increment 'customId'
PayerSchema.pre<IPayer>('save', async function (next) {
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

// Create and export the Payer model
export default model<IPayer>('Payer', PayerSchema);