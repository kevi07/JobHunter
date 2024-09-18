/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mocker_owner:Zwnmrlb2ye1t@ep-silent-field-a1t5xhow.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };