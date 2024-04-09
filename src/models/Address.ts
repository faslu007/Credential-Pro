import { Schema, model, Document } from 'mongoose';

// Define the address schema
interface IAddress extends Document {
    streetLine1: string;
    streetLine2: string;
    city: string;
    state: string;
    zipCode: string;
}

const addressSchema = new Schema<IAddress>({
    streetLine1: { type: String, required: true, trim: true },
    streetLine2: { type: String, trim: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
});

// Create and export the address model
const Address = model<IAddress>('Address', addressSchema);
export default Address;