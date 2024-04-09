import mongoose, { Document, Schema, CallbackError } from 'mongoose';
import { UserType, loginMethod, userAccessLevel } from '../Commons/CommonEums';

export interface IUser extends Document {
    customUserId: number;
    firstName: string;
    lastName: string;
    displayName: string;
    loginMethod: loginMethod;
    avatarUrl: string;
    contactPhone: string;
    email: string;
    password: string;
    userType: UserType;
    permissions: string[];
    designation: string;
    company: string;
    lastOpenedAccountTab: string;
    lastOpenedProviderTab: string;
    billingAccount: Schema.Types.ObjectId;
    providers: Schema.Types.ObjectId[];
    emailNotification: boolean;
    createdBy: Schema.Types.ObjectId;
    updatedBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    customUserId: { type: Number, required: true, unique: true, auto: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    avatarUrl: { type: String },
    contactPhone: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    loginMethod: {
        type: String,
        enum: Object.values(loginMethod),
        default: 'email'
    },
    password: { type: String },
    emailNotification: { type: Boolean, default: true },
    userType: { type: String, enum: Object.values(UserType), required: true },
    permissions: { type: [String], required: true },
    designation: { type: String },
    lastOpenedGroupProviderTab: { type: String },
    lastOpenedAssociateProviderTab: { type: String },
    billingAccount: { type: Schema.Types.ObjectId, ref: 'BillingAccount' },
    providers: [{ type: Schema.Types.ObjectId, ref: 'Provider' }],
    accessLevels: [{
        provider: { type: Schema.Types.ObjectId, ref: 'Provider', required: true },
        accessLevel: { type: String, enum: Object.values(userAccessLevel), required: true}
    }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});

UserSchema.virtual('displayName').get(function (this: IUser) {
    return `${this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase()} ${this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase()}`;
});

UserSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    }
});


// Custom pre-save middleware to auto-increment 'customUserId'
UserSchema.pre<IUser>('save', async function (next) {
    if (this.isNew) {
        try {
            // Find the maximum 'customUserId' in the collection
            const highestCustomUserId = await (this.constructor as any).findOne()
                .sort({ customUserId: -1 })
                .select('customUserId')
                .lean()
                .exec() as { customUserId: number };

            // Increment 'customUserId' for the new document
            this.customUserId = (highestCustomUserId ? highestCustomUserId.customUserId : 0) + 1;
            next();
        } catch (error) {
            next(error as CallbackError);
        }
    } else {
        next();
    }
});

export default mongoose.model<IUser>('User', UserSchema);