function copy(obj) {

    if (obj == null || typeof(obj) != 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(element => copy(element));
    } else {
        let newObj = {};
        for (let key in obj) {
            newObj[key] = copy(obj[key]);
        }
        return newObj;
    }
}

const obj = {
    name: 'Alex',
    age: 33, 
    kids: null,
    marks: [8, 10, 8, 9, [2, 4, 6]],
    adress: { 
        country: 'UA', 
        city: 'Dnipro',
        flats: [2, 30, 6],
        actualAddress: {
            country: 'UA',
            city: 'Kyiv'
        }
    }     
}

const objCopy = copy(obj);