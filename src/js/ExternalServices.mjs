const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ExternalServices {
    constructor() {
        // this.category = category;
        // this.path = `../public/json/${this.category}.json`;
    }
    async getData(category) {
        const response = await fetch(`https://wdd330-backend.onrender.com/products/search/${category}`);
        const data = await convertToJson(response);

        return data.Result;
    }
    async findProductById(id) {
        const response = await fetch(`https://wdd330-backend.onrender.com/product/${id}`);
        const data = await convertToJson(response);
        // console.log(data.Result);
        return data.Result;
    }

    async checkout(payload) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };
        return await fetch(`https://wdd330-backend.onrender.com/checkout/`, options).then(convertToJson);
    }
}