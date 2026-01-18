'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CreditScore extends Model {
    static associate(models) {
      CreditScore.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }

    // Get score rating
    getScoreRating() {
      if (this.score >= 750) return 'Excellent';
      if (this.score >= 700) return 'Good';
      if (this.score >= 650) return 'Fair';
      if (this.score >= 600) return 'Poor';
      return 'Very Poor';
    }
  }

  CreditScore.init({
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
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 300,
        max: 850
      }
    },
    scoreMonth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'score_month'
    },
    paymentHistoryScore: {
      type: DataTypes.INTEGER,
      field: 'payment_history_score',
      validate: { min: 0, max: 100 }
    },
    creditUtilizationScore: {
      type: DataTypes.INTEGER,
      field: 'credit_utilization_score',
      validate: { min: 0, max: 100 }
    },
    creditAgeScore: {
      type: DataTypes.INTEGER,
      field: 'credit_age_score',
      validate: { min: 0, max: 100 }
    },
    creditMixScore: {
      type: DataTypes.INTEGER,
      field: 'credit_mix_score',
      validate: { min: 0, max: 100 }
    },
    newCreditScore: {
      type: DataTypes.INTEGER,
      field: 'new_credit_score',
      validate: { min: 0, max: 100 }
    }
  }, {
    sequelize,
    modelName: 'CreditScore',
    tableName: 'credit_scores',
    timestamps: true,
    underscored: true
  });

  return CreditScore;
};