const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
{
    userId: {
        type:  String,
        required: true,
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Comment'
    },
    reason: {
        type: String,
        required: true,
        enum:  ['harassment', 'hate_speech', 'spoilers', 'spam', 
            'misinformation', 'inappropriate', 'offensive', 'off_topic', 'other']
    },
    details:  {
        type: String,
        required: function() {
            return this.reason === 'other';
        }
    },
    timestamp: {
        type: Date,
        defaultl: Date.now
    }
}, {
    timestamps: true,
}
);

reportSchema.index({ userId:  1, commentId: 1}, {unique: true});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;