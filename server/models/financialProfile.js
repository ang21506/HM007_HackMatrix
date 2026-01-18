'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FinancialProfile extends Model {
    static associate(models) {
      FinancialProfile.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }

    // Calculate Debt-to-Income Ratio
    calculateDTI() {
      if (!this.monthlyIncome || this.monthlyIncome === 0) return 0;
      const totalDebt = (parseFloat(this.monthlyExpenses) || 0) + 
                        (parseFloat(this.existingLoans) || 0);
      return ((totalDebt / this.monthlyIncome) * 100).toFixed(2);
    }
  }

  FinancialProfile.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    monthlyIncome: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'monthly_income',
      validate: {
        min: 0
      }
    },
    employmentType: {
      type: DataTypes.STRING(50),
      field: 'employment_type',
      validate: {
        isIn: [['Salaried', 'Self-employed', 'Business', 'Freelancer', 'Other']]
      }
    },
    employerName: {
      type: DataTypes.STRING(255),
      field: 'employer_name'
    },
    yearsEmployed: {
      type: DataTypes.DECIMAL(3, 1),
      field: 'years_employed',
      validate: {
        min: 0,
        max: 50
      }
    },
    monthlyExpenses: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'monthly_expenses',
      validate: {
        min: 0
      }
    },
    existingLoans: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'existing_loans',
      defaultValue: 0,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'FinancialProfile',
    tableName: 'financial_profiles',
    timestamps: true,
    underscored: true
  });

  return FinancialProfile;
};