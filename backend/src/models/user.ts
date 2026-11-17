import { Schema, model, type Types } from 'mongoose';

export const USER_ROLES = ['user', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const isUserRole = (value: string): value is UserRole => USER_ROLES.includes(value as UserRole);

export interface UserPersistence {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserDocument = UserPersistence & {
  _id: Types.ObjectId;
};

export const userSchema = new Schema<UserPersistence>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio.'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres.'],
      maxlength: [80, 'El nombre no debe superar 80 caracteres.']
    },
    email: {
      type: String,
      required: [true, 'El correo es obligatorio.'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El correo no es válido.']
    },
    passwordHash: {
      type: String,
      required: [true, 'La contraseña es obligatoria.'],
      minlength: [60, 'La contraseña no es válida.']
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: 'user'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const UserModel = model<UserPersistence>('User', userSchema);

export const toUser = (user: UserDocument): User => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});
