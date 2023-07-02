const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

let readStream = readline.createInterface({
    input: fs.createReadStream('./Address.txt'),
    output: process.stdout,
    terminal: false
});
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

readStream.on('line', async function (address) {
    let data = JSON.stringify({
        "address": address
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.noobysswap.io/api/swap',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    let config2 = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.noobysswap.io/api/liquidity',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(address + '---swap---' + response.statusText);
        })
        .catch((error) => {
            console.log(error);
        });


    await sleep(3000);
    axios.request(config2)
        .then((response) => {
            console.log(address + '---liquidity---' + response.statusText);
        })
        .catch((error) => {
            console.log(error);
        });
    await sleep(3000);
});
