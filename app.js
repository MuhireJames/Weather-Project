
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser. urlencoded({extended:true}));
app.get("/", function(req,res){
res.sendFile(__dirname + "/index.html") ;
});
app.post("/", function(req,res){
  const query=req.body.CityName
  const apiKey="1a6461c539402f01e178109ad0bc3677"
  const unit="metric"

  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode)

    response.on("data", function(data){

      const weatherData=JSON.parse(data)

      const temp=weatherData.main.temp

      const description=weatherData.weather[0].description
      const icon=weatherData.weather[0].icon
      const imageUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.send("<p><h1>The degree in " + query + " is " + temp + " degree celcius </h1></p>" + "<p><h2> Weather currently is " + description + "</h2></p>" + " <img src=" + imageUrl +">");
  })
  })

})

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
