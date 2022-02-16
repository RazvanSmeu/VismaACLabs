package com.doubletex.app;

import com.doubletex.app.config.MvcConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
public class DoubletexApplication {

	public static void main(String[] args) {
		SpringApplication.run(DoubletexApplication.class, args);
	}

}
