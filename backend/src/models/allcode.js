'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {

        static associate(models) {
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })

            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' })

            Allcode.hasMany(models.Doctor_Info, { foreignKey: 'priceId', as: 'priceTypeData' })
            Allcode.hasMany(models.Doctor_Info, { foreignKey: 'provinceId', as: 'provinceTypeData' })
            Allcode.hasMany(models.Doctor_Info, { foreignKey: 'paymentId', as: 'paymentTypeData' })

            Allcode.hasMany(models.Booking, { foreignKey: 'timeType', as: 'timeTypeDataPatient' })
        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEN: DataTypes.STRING,
        valueVI: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};