# MeetYourDoctor
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/java/java-original-wordmark.svg" title="Java" alt="Java" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/spring/spring-original-wordmark.svg" title="Spring" alt="Spring" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/mysql/mysql-original-wordmark.svg" title="MySQL"  alt="MySQL" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" title="AWS" alt="AWS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>
</div>

# Features
1. Localization based on Geography
2. JWT based Authentication
3. Role based user Authorization
4. Restful Web Service
5. Single Page Application


## Prerequisites to start Application on your machine
1. Gmail App Password
2. Razorpay Api key
3. OpenWeather Api key

Swagger Url
```bash
http://localhost:8080/swagger-ui/index.html
```


## 3rd Party API Used 

#### Get Weather details

```http
  GET https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get My Address details(Reverse Geocoding)

```http
  GET `http://apis.mapmyindia.com/advancedmaps/v1/${api_key}/rev_geocode?lng=${latitude}&lat=${longitude}`
```
```https
https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleAPIKey}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `lat & lon`      | `string` | **Required**. Your Api Key |

#### Get all State list of India
```https
https://cdn-api.co-vin.in/api/v2/admin/location/states
```
#### Get all districts list
```https
https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}
```




