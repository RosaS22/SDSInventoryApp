exports.handler = async function (event, context) {
    const data = JSON.parse(event.body); // Parse the incoming data
    
    // You can process the data here and store it or return a response
    console.log('Received inventory data:', data);
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data saved successfully!" }),
    };
  };
  