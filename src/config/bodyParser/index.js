module.exports = {
  inflate: true, // When set to true, then deflated (compressed) bodies will be inflated, Defaults to true
  limit: "100kb", // Controls the maximum request body size
  strict: true, // When set to true, will only accept arrays and objects
  type: "application/json" // The type option is used to determine what media type the middleware will parse, Defaults to application/json
};
