"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
require("./mongodb");
function dateInTwoDays() {
    return new Date(+new Date() + 7 * 24 * 60 * 60 * 1000);
}
const ClassSchema = new mongoose.Schema({
    number: {
        type: Number,
        validate: {
            validator: (value) => value == Math.floor(value),
            message: "{VALUE} is not an integer"
        },
        min: 101,
        max: 998,
        required: true
    },
    title: {
        type: String,
        trim: true,
        maxlength: 200,
        required: true,
    },
    assignments: {
        type: [{
                class: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    trim: true,
                    maxlength: 200,
                    required: true
                },
                points: {
                    type: Number,
                    validate: {
                        validator: (value) => value >= 0,
                        message: "{VALUE} is not positive"
                    },
                    default: 100
                },
                due: {
                    type: Date,
                    default: dateInTwoDays
                }
            }],
        required: true,
    },
});
exports.Class = mongoose.model("Class", ClassSchema);
//# sourceMappingURL=class.js.map