// src/models/transactionModel.js
import { DataTypes } from "sequelize";
import config from "../config.js";

const { sequelize } = config;

const Transaksi = sequelize.define(
  "Transaksi",
  {
    invoiceNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product: {
      type: DataTypes.JSON, // Menggunakan JSON untuk menyimpan data produk dengan productName dan quantity
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // createdAt dan updatedAt otomatis ditambahkan
  }
);

export default Transaksi;
