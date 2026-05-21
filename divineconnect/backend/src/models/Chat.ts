import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage extends Document {
  chat: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  senderType: 'user' | 'pandit' | 'admin';
  content: string;
  messageType: 'text' | 'image' | 'video' | 'document' | 'location';
  mediaUrl?: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

export interface IChat extends Document {
  booking?: mongoose.Types.ObjectId;
  participants: Array<{
    user: mongoose.Types.ObjectId;
    role: 'user' | 'pandit' | 'admin' | 'temple_admin';
  }>;
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCount: Record<string, number>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>(
  {
    chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    senderType: {
      type: String,
      enum: ['user', 'pandit', 'admin'],
      required: true,
    },
    content: { type: String, required: true },
    messageType: {
      type: String,
      enum: ['text', 'image', 'video', 'document', 'location'],
      default: 'text',
    },
    mediaUrl: { type: String },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
  },
  { timestamps: true }
);

const chatSchema = new Schema<IChat>(
  {
    booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
    participants: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        role: {
          type: String,
          enum: ['user', 'pandit', 'admin', 'temple_admin'],
        },
      },
    ],
    lastMessage: { type: String },
    lastMessageAt: { type: Date },
    unreadCount: { type: Map, of: Number, default: {} },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

chatMessageSchema.index({ chat: 1, createdAt: 1 });
chatSchema.index({ 'participants.user': 1 });

export const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);
export default mongoose.model<IChat>('Chat', chatSchema);
