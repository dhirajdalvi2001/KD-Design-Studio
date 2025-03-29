import * as yup from "yup";

export const initialValue = {
  name: "",
  year: new Date().getFullYear(), // Default to current year
  slug: "",
  type: "",
  introduction: "",
  concept_overview: "",
  key_features: [{ value: "" }],
};

export const productSchema = yup.object().shape({
  name: yup.string().required("Name is required").trim(),
  year: yup
    .number()
    .required("Year is required")
    .integer("Year must be an integer")
    .min(1900, "Year must be at least 1900"),
  slug: yup.string().required("Slug is required").trim(),
  type: yup
    .string()
    .oneOf(["PROTOTYPE", "PRODUCT"], "Invalid type")
    .required("Type is required"),
  introduction: yup.string().required("Introduction is required").trim(),
  concept_overview: yup.string().trim(),
  key_features: yup.array(),
  assets: yup.object().shape({
    1: yup.string().url("Invalid URL format"),
  }),
});
