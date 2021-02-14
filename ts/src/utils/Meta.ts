import got from "got";

const META_API_KEY = process.env.META_API_KEY;

const login = async function checkLicense(license: string, machine: string) {
    try{
        const response: MetaResponse = await got.patch(`https://api.metalabs.io/v4/licenses/${license}`, {
            headers: {
                Authorization: META_API_KEY,
                "Content-type": "application/json"
            },
            json: {
                metadata: {
                    machine
                }
            }
        }).json();

        const { status } = response;

        if(status === "active" || status === "trialing"){
            // I recommend filtering down the response, I left it as the full object for you to choose.
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

const reset = async function resetLicense (license: string) {
    try{
        const response: MetaResponse = await got.patch(`https://api.metalabs.io/v4/licenses/${license}`, {
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

        if(status === "active" || status === "trialing"){
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

export default {
    login,
    reset
}

interface MetaResponse {
    email: string,
    key: string,
    unlocked: boolean,
    status: "active" | "trialing" | "past_due",
    cancel_at: any,
    trial_end: any,
    created: Date,
    account: string,
    customer: string,
    subscription:any,
    payment_method: any,
    plan: Plan,
    release: any,
    metadata: object,
    user: any,
    id: string
}

interface Plan {
    account: string,
    active: boolean,
    product: string,
    price: string,
    name: string,
    allow_unbinding: boolean,
    allow_reselling: boolean,
    amount: number,
    created: Date,
    currency: string,
    roles: string[],
    recurring: any,
    type: string,
    id: string
}

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