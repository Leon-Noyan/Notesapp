import mongoose, { Schema, Document } from 'mongoose'

export interface INote extends Document {
  title: string
  text?: string
  createdAt: Date
}

const NoteSchema: Schema = new Schema<INote>({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  text: { type: String, trim: true, maxlength: 2000, default: '' },}, {
    timestamps: true,
  })

export default mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema)
