import { IRole } from '@/interfaces'
import mongoose, { Schema } from 'mongoose'
import { mongoConnections } from '@/loaders/mongoose'

var Role = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    sudo: { type: Boolean, default: false, required: true },
    permissionKeys: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
)

export default mongoConnections['main'].model<IRole>('Role', Role)
