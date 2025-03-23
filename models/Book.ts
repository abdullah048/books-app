import mongoose, { Schema, type Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  description?: string;
  coverImage?: string;
  genre: string[];
  publicationDate: Date;
  isbn?: string;
  pageCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String },
    genre: { type: [String], required: true },
    publicationDate: { type: Date, required: true },
    isbn: { type: String, unique: true, sparse: true },
    pageCount: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Create text index for search
BookSchema.index({ title: 'text', description: 'text', author: 'text' });

export default mongoose.models.Book ||
  mongoose.model<IBook>('Book', BookSchema);
