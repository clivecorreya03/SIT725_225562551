const mongoose = require("mongoose");

const threatSchema = new mongoose.Schema(
  {
    threatName: {
      type: String,
      required: [true, "Threat name is required"],
      trim: true,
      minlength: [3, "Threat name must contain at least 3 characters"],
      maxlength: [80, "Threat name cannot exceed 80 characters"]
    },

    threatCategory: {
      type: String,
      required: [true, "Threat category is required"],
      trim: true,
      enum: {
        values: [
          "Social Engineering",
          "Malware",
          "Web Attack",
          "Network Attack",
          "Credential Attack"
        ],
        message: "{VALUE} is not a supported threat category"
      }
    },

    severityLevel: {
      type: String,
      required: [true, "Severity level is required"],
      enum: {
        values: ["Low", "Medium", "High", "Critical"],
        message: "{VALUE} is not a valid severity level"
      }
    },

    preventionMethod: {
      type: String,
      required: [true, "Prevention method is required"],
      trim: true,
      minlength: [10, "Prevention method must contain at least 10 characters"],
      maxlength: [300, "Prevention method cannot exceed 300 characters"]
    },

    imagePath: {
      type: String,
      required: [true, "Image path is required"],
      trim: true
    },

    learnMoreLink: {
      type: String,
      required: [true, "Learn-more link is required"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Threat = mongoose.model("Threat", threatSchema);

module.exports = Threat;