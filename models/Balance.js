const { DataTypes } = require("sequelize");
const sequelize = require("../DB/db.config")

const Balance = sequelize.define('Balance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get() {
            let rawValue = this.getDataValue('id');
            return rawValue = undefined;
        }

    },

    user_id: {
        type: DataTypes.INTEGER,
        get() {
            let rawValue = this.getDataValue('id');
            return rawValue = undefined;
        }
    },

    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },

    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }

}, {
    tableName: `balance`,
    timestamps: false,


}
)


module.exports = Balance
