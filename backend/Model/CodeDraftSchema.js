import mongoose from 'mongoose';
const codeDraftSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  problemId: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});
codeDraftSchema.index({ userId: 1, problemId: 1, language: 1 }, { unique: true });

export default mongoose.model('CodeDraft', codeDraftSchema);