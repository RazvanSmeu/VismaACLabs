package com.doubletex.app;

import com.doubletex.app.config.Doubletex;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;


@SpringBootApplication
@EnableConfigurationProperties(Doubletex.class)
public class DoubletexApplication {

	public static void main(String[] args) {
		SpringApplication.run(DoubletexApplication.class, args);
	}

	@Bean
	public Jackson2ObjectMapperBuilder jacksonBuilder() {
		Jackson2ObjectMapperBuilder b = new Jackson2ObjectMapperBuilder();
		b.mixIn(Object.class, IgnoreHibernatePropertiesInJackson.class);
		return b;
	}


	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private abstract class IgnoreHibernatePropertiesInJackson{ }

}
