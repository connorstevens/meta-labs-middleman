const got = require('got');

const META_API_KEY = process.env.META_API_KEY;

const login = async (license, machine) => {
    try{
        const response = await got.patch(`https://api.metalabs.io/v4/licenses/${license}`, {
            headers: {
                Authorization: META_API_KEY,
                "Content-type": "application/json"
            },
            json: {
                metadata: {
                    machine: machine
                }
            }
        }).json();

        const { status } = response;

        if(status == "active" || status == "trialing"){
            //I recommend filtering down the response, I left it as the full object for you to choose.
            return response;
        }
        else{
            return { isUser: false };
        }
    }
    catch(err){
        return { isUser: false };
    }
}

const reset = async (license) => {
    try{
        const response = await got.patch(`https://api.metalabs.io/v4/licenses/${license}`, {
            headers: {
                Authorization: META_API_KEY,
                "Content-type": "application/json"
            },
            json: {
                metadata: {
                    machine: null
                }
            }
        }).json();

        const { status } = response;

        if(status == "active" || status == "trialing"){
            return 200;
        }
        else{
            return 404;
        }
    }
    catch(err){
        return 404;
    }
}

module.exports = { login, reset };

/*
    Example Response

    {
        "email": "user@user.com",
        "key": "0000-0000-0000-0000",
        "unlocked": false,
        "status": "active",
        "cancel_at": null,
        "trial_end": null,
        "created": 1111111111111,
        "account": "abcdefghijk",
        "customer": "cus_abcdefghijk",
        "subscription": null,
        "payment_method": null,
        "plan": {
            "account": "abcdefghijk",
            "active": true,
            "product": "prod_abcdefghijk",
            "price": "price_abcdefghijk",
            "name": "F&F",
            "allow_unbinding": false,
            "allow_reselling": false,
            "amount": 0,
            "created": 1111111111111,
            "currency": "usd",
            "roles": [
            "1111111111111",
            "1111111111111"
            ],
            "recurring": null,
            "type": "free",
            "id": "abcdefghijk"
        },
        "release": "abcdefghijk",
        "metadata": {
            "machine": "696969"
        },
        "user": null,
        "id": "abcdefghijk"
    }

*/