const http = require("http");
const url = require("url");
const axios = require("axios");

// Create an HTTP server
const server = http.createServer(async (req, res) => {
  // Parse the URL and query parameters
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  // Check if the "url" parameter is provided in the query string
  if (!query.url) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: 'Missing "url" parameter in query.' }));
    return;
  }

  // Extract and process the "url" parameter(s)
  const urls = Array.isArray(query.url) ? query.url : [query.url];

  // Collect numbers from the provided URLs
  const numbers = new Set();

  try {
    for (const url of urls) {
      const response = await axios.get(url);
      const responseData = response.data;

      if (responseData.number && Array.isArray(responseData.number)) {
        responseData.number.forEach((num) => numbers.add(num));
      }
    }

    // Sort numbers in ascending order
    const sortedNumbers = [...numbers].sort((a, b) => a - b);

    // Respond with the sorted numbers
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ numbers: sortedNumbers }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
});

// Listen on port 8008
const port = 8008;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
