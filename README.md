:exclamation: This project won't work on its own unless it is connected to its backend counterpart:exclamation:

**Please make sure you have downloaded and properly executed the other repository**

https://github.com/JulianCoronado17/FIFE_Gym

:warning: **Pay attention to the following changes:** :warning:

1. After opening the Java project in NetBeans, visit your WebConfig class:
``` bash
@Configuration
public class WebConfig { // Ensure this class is public
    @Bean
    public WebMvcConfigurer corsConfigurer() { // Correct placement of 'public'
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Adjust to match your API path
                        .allowedOrigins("http://127.0.0.1:XXXX") // Frontend origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE"); // Allowed methods
            }
        };
    }
}
```
2. Modify the line ``` bash .allowedOrigins("http://127.0.0.1:XXXX") ``` and insert the port number that will be deploying your frontend preview, otherwise it will be impossible for your application to successfully establish a database connection.
3. After your Java project is up and running, you will be able to properly navigate the web app using LiveServer.
