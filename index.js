import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import transaksiRouter from "./routers/transaksiRouter.js";
import supportRouter from "./routers/supportRouter.js";
import settingsRouter from "./routers/settingsRouter.js";
import reviewloansRouter from "./routers/reviewloansRouter.js";
import repaymentRouter from "./routers/repaymentRouter.js";
import notificationRouter from "./routers/notificationRouter.js";
import loanRouter from "./routers/loanRouter.js";
import loanReportRouter from "./routers/loanReportRouter.js";
import lenderProfileRouter from "./routers/lenderProfileRouter.js";
import investmentRouter from "./routers/investmentRouter.js";
import borrowerRepaymentRouter from "./routers/borrowerLoanRouter.js";
import borrowerNotificationRouter from "./routers/borrowerNotificationRouter.js";
import borrowerLoanRouter from "./routers/borrowerLoanRouter.js";
import paymentRoutes from "./routers/paymentRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = config.port;
const { sequelize } = config;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
));

// Routers
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/transaksi", transaksiRouter);
app.use("/api/support", supportRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/review-loan", reviewloansRouter);
app.use("/api/repayments", repaymentRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/loans", loanRouter);
app.use("/api/loan-report", loanReportRouter);
app.use("/api/lender-profile", lenderProfileRouter);
app.use("/api/investment", investmentRouter);
app.use("/api/borrower-repayment", borrowerRepaymentRouter);
app.use("/api/borrower-notification", borrowerNotificationRouter);
app.use("/api/borrower-loan", borrowerLoanRouter);
app.use("/api", paymentRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});
// Sync database and start the server

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error.message);
  }
};

startServer();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
