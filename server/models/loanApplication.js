'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LoanApplication extends Model {
    static associate(models) {
      LoanApplication.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }

    // Calculate EMI
    calculateEMI() {
      const P = parseFloat(this.loanAmount);
      const R = parseFloat(this.interestRate) / 12 / 100;
      const N = parseInt(this.tenureMonths);
      
      if (R === 0) return (P / N).toFixed(2);
      
      const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      return EMI.toFixed(2);
    }
  }

  LoanApplication.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    loanType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'loan_type',
      validate: {
        isIn: [['Home', 'Personal', 'Car', 'Education', 'Business']]
      }
    },
    loanAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: 'loan_amount',
      validate: {
        min: 10000
      }
    },
    interestRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      field: 'interest_rate',
      validate: {
        min: 1,
        max: 30
      }
    },
    tenureMonths: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'tenure_months',
      validate: {
        min: 6,
        max: 360
      }
    },
    purpose: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'Pending',
      validate: {
        isIn: [['Pending', 'Applied', 'Approved', 'Rejected', 'Closed']]
      }
    },
    appliedAt: {
      type: DataTypes.DATE,
      field: 'applied_at',
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'LoanApplication',
    tableName: 'loan_applications',
    timestamps: false
  });

  return LoanApplication;
};