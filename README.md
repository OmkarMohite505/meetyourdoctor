# Meet Your Doctor- Web Portal
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/java/java-original-wordmark.svg" title="Java" alt="Java" width="40" height="40"/>&emsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&emsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/spring/spring-original-wordmark.svg" title="Spring" alt="Spring" width="40" height="40"/>&emsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&emsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&emsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&emsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/mysql/mysql-original-wordmark.svg" title="MySQL"  alt="MySQL" width="40" height="40"/>&emsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" title="AWS" alt="AWS" width="40" height="40"/>&emsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>
</div>

# Features
1. Localization based on Geography
2. JWT based Authentication
3. Role based user Authorization
4. Restful Web Service
5. Single Page Application

## Approach Used
1. Code First
2. Reactive(Declarative) Programming
3. KISS

#### HTTP Communication Protocol

#### Monolithic Architecture

## Platform used
1. JDK-11
2. Maven 4.0.0
3. springframework 2.7.3
4. Spring Boot Web
5. Spring Security 
6. Spring Data JPA
7. React 17.0.2
8. React-Router-Dom 6.2.2
9. React-i18next


## Prerequisites to start Application on your machine
1. Gmail App Password
2. Razorpay Api key
3. OpenWeather Api key
4. JDK-11 or latest
5. MySQL
6. Maven
7. Nodejs
8. React App



## Swagger Url
```bash
http://localhost:8080/swagger-ui/index.html
```


## 3rd Party API Used 

#### Get Weather details

```http
  GET `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `latitude & longitude` | `string` | **Required**. Your API key |

#### Get My Address details(Reverse Geocoding)

```http
  GET `http://apis.mapmyindia.com/advancedmaps/v1/${api_key}/rev_geocode?lng=${latitude}&lat=${longitude}`
  GET `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleAPIKey}`
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `latitude & longitude`      | `string` | **Required**. Your Api Key |

#### Get all State list of India
```http
GET `https://cdn-api.co-vin.in/api/v2/admin/location/states`
```
#### Get all districts list
```http
GET `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `state id`      | `string` | **Required**. State Id |

#### Razorpay API
```bash
		<dependency>
			<groupId>com.razorpay</groupId>
			<artifactId>razorpay-java</artifactId>
			<version>1.3.9</version>
		</dependency>
```
Create Payment Order
```bash
                var client = new RazorpayClient(key_id, key_secret);
		JSONObject ob = new JSONObject();
		double amount = paymentDTO.getAmount() * 100;
		ob.put("amount", amount);
		ob.put("currency", "INR");
		ob.put("receipt", "txn_123");
		Order order = client.Orders.create(ob);
```
Display Payment UI & Checkout
```bash
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            const options = {
            key: "rzp_test_avqPqvBNedSxPH", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: "INR",
            name: ``,
            description: "Appointment Fees of Doctor",
            order_id: order_id,
            image: `data:image/jpg;base64,${doctorPic}`,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                };
            },
            prefill: {
                name: `${patient.firstName} ${patient.lastName}`,
                email: `${patient.email}`,
                contact: `${patient.mobileNumber}`,
            },
            notes: {
                address: "",
            },
            theme: {
                color: "#61dafb",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
```
#### Twilio SMS API
```bash
		<dependency>
			<groupId>com.twilio.sdk</groupId>
			<artifactId>twilio</artifactId>
			<version>9.0.0-rc.2</version>
		</dependency>
```
```bash
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
		Message message = Message.creator(new PhoneNumber(MY_NUMBER), new PhoneNumber("+917620608558"),
				 "Hello User, Your Appointment Booked Successfully\nRegards,\nMeet Your Doctor").create();
```
#### Mail Gmail API
```bash
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-mail</artifactId>
		</dependency>
```
```bash
                SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo("user@gmail.com");
		mesg.setSubject("Your Appointment Bookking Details Updated Successfully");
		var doctorName = appointment.getDoctor().getFirstName();
		mesg.setText("Dear " + appointment.getPatient().getFirstName() + ",\nYour Appointment Closed By Doctor. "
				+ doctorName + "\nFor more information log on to www.meetyourdoctor.co.in"
				+ "\nRegards,\nMeet You Doctor Services");
		sender.send(mesg);
```
## Future Scope
1. Client & Server Side Validation
2. Exception handling
3. All Pages of UI in Marthi Language
4. WhatsApp Business API Integration
5. Virtual Consultation for Patients and Doctors 

## Support

For support, email omkarmohite505@gmail.com


