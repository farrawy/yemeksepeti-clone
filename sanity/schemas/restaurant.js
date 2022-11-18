export default {
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short Description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      type: "image",
      title: "Restaurant Image",
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude of the Restaurant",
    },
    {
      name: "long",
      type: "number",
      title: "Longitude of the Restaurant",
    },
    {
      name: "address",
      type: "string",
      title: "Restaurant Address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "Enter a Rating from 10 Stars",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(10)
          .error("Please enter a value between 1 and 10"),
    },
    {
      name: "rating_count",
      type: "number",
      title: "Ratings",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "minimum_order_price",
      type: "number",
      title: "Minimum Order Price in TL",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "estimated_time_to_deliver",
      type: "number",
      title: "Estimated Time to Deliver in Minutes",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "delivery_fee",
      type: "number",
      title: "Delivery Fee",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price_range",
      type: "string",
      title: "Price Range (High, Medium, Standard)",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "Category",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
    },
  ],
};
