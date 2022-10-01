const config = {
  DATABASE: {
    url: "mongodb+srv://shubhamjain:hiring123@cluster0.ygqo6.mongodb.net/hiringPortal?retryWrites=true&w=majority",
  },
  AWS: {
    accessKeyId: "AKIAYG3PPFJWRXADXOJY",
    secretAccessKey: "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",
    region: "ap-south-1",
    signatureVersion: "v4",
    apiVersions: {
      s3: "2006-03-01",
    },
    s3: {
      bucketName: "hiring",
    },
  },
  JWT: {
    secret: "1234576890",
    expiry: "86400s",
    algorithms: ["HS256"],
  },
  DEFAULT_RANDOM_ID_GENERATOR_LENGTH: 12,
};

module.exports = config;
