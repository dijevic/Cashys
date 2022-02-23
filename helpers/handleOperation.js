const habdleOperation = (type, verbo) => {


    if (verbo == 'PUT') {
        switch (type) {
            case 'debt':
                newBalance = Number(balance.amount) + Number(operation.amount) - Number(amount);
                break;
            case 'income':
                newBalance = Number(balance.amount) - Number(operation.amount) + Number(amount);

            default:
                break;
        }
    }


}