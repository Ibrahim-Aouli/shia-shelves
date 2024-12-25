const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        set: value => value.toLowerCase()
    },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});
