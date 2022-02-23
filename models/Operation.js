const { DataTypes } = require("sequelize");
const sequelize = require("../DB/db.config");


const Operation = sequelize.define('Operation', {
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
    category_id: {
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

    description: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    operation_Type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {

            isIn: {
                args: [['income', 'debt']],
                msg: "Must be income or debt"
            },
            min: 0
        }
    }


}, {
    tableName: `operation`,
    timestamps: false,


}
)





module.exports = Operation




