'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {

        static associate(models) {
        }
    };
    History.init({
        doctorId: DataTypes.INTEGER,
        patientId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        files: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};