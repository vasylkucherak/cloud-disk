import { Schema, model, } from 'mongoose';

const userSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    files: [{type: Schema.Types.ObjectId, ref: 'File'}]
});

export default model('User', userSchema)