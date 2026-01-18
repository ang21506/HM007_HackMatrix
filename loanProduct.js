'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LoanProduct extends Model {
    static associate(models) {
      // No associations for now
    }
  }

  LoanProduct.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bankName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'bank_name'
    },
    loanType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'loan_type'
    },
    minAmount: {
      type: DataTypes.DECIMAL(12, 2),
      field: 'min_amount'
    },
    maxAmount: {
      type: DataTypes.DECIMAL(12, 2),
      field: 'max_amount'
    },
    interestRateMin: {
      type: DataTypes.DECIMAL(5, 2),
      field: 'interest_rate_min'
    },
    interestRateMax: {
      type: DataTypes.DECIMAL(5, 2),
      field: 'interest_rate_max'
    },
    minTenureMonths: {
      type: DataTypes.INTEGER,
      field: 'min_tenure_months'
    },
    maxTenureMonths: {
      type: DataTypes.INTEGER,
      field: 'max_tenure_months'
    },
    processingFee: {
      type: DataTypes.DECIMAL(5, 2),
      field: 'processing_fee',
      comment: 'Percentage of loan amount'
    },
    minAge: {
      type: DataTypes.INTEGER,
      field: 'min_age',
      defaultValue: 21
    },
    maxAge: {
      type: DataTypes.INTEGER,
      field: 'max_age',
      defaultValue: 65
    },
    minIncome: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'min_income'
    },
    features: {
      type: DataTypes.TEXT,
      comment: 'JSON string of features'
    }
  }, {
    sequelize,
    modelName: 'LoanProduct',
    tableName: 'loan_products',
    timestamps: true,
    underscored: true
  });

  return LoanProduct;
};