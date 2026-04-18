import mongoose, { Document, Schema } from "mongoose";

export interface IUrl extends Document {
    urlID: number;
    shortCode: string;
    originalUrl: string;
    createdAt: Date;
}

const UrlSchema = new Schema<IUrl> ({
    urlID: { type: Number, required: true, unique: true },
    shortCode: { type: String, required: true, unique: true, index: true },
    originalUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Url || mongoose.model<IUrl>("Url", UrlSchema);