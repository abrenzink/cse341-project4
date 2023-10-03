const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

const doc = {
    info: {
        title: 'BYU I - CSE341 - Project 3',
        description: 'Aviation dictionary API'
    },
    host: 'project3-5ag8.onrender.com',
    schemes: ['https', 'http']
};


// here we generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./server.js');
// });