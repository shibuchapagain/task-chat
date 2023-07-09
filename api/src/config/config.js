const Config = {
  JWT_SECRET: "Test123",
  // MONGO_URL: "mongodb://127.0.0.1:27017/mern-14",
  // mongodb+srv://shibuchapagain12:<password>@cluster0.ogaireo.mongodb.net/?retryWrites=true&w=majority
  MONGO_URL: process.env.MONGO_URL,
  SMTP_HOST: "smtp.mailtrap.io",
  SMTP_PORT: 465,
  SMTP_USER: "c59888f7f55c9b",
  SMTP_PASSWORD: "f3e619abb8b199",
  SMTP_TLS: false,
  SMTP_FROM: "noreply@test.com",
};

module.exports = Config;
