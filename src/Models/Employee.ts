import mongoose, { Schema, Document } from 'mongoose';

interface EmployeeDocument extends Document {
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: string;
  photo: string;
}

const EmployeeSchema = new Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    number: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.created_at;
        delete ret.updated_at;
      },
    },
  }
);

const Employee = mongoose.model<EmployeeDocument>('employee', EmployeeSchema);
export { Employee };
