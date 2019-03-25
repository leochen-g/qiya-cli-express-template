module.exports = (sequelize, DataTypes) => sequelize.define(
    'users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar_url: DataTypes.STRING,
        gender: DataTypes.INTEGER,
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        tableName: 'users',
    }, {
        timestamps: false
    }
);