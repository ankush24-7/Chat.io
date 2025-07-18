const whitelist = [
  "http://localhost:5173",
  "https://chat-io-tau.vercel.app",
  "https://chat-io-tau.vercel.app/",
  "https://chat-io-ankushs-projects-11b078a3.vercel.app",
  "https://chat-io-ankushs-projects-11b078a3.vercel.app/",
  "https://chat-io-git-main-ankushs-projects-11b078a3.vercel.app",
  "https://chat-io-git-main-ankushs-projects-11b078a3.vercel.app/",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
