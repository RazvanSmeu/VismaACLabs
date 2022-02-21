package com.doubletex.app.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.stereotype.Component;

/**
 * @author Alexandru Enache
 * @date 19.02.2022
 */

@Component
@ConfigurationProperties("doubletex")
public class Doubletex implements WebServerFactoryCustomizer<ConfigurableWebServerFactory> {
    private String env;
    private int port;

    @Override
    public void customize(ConfigurableWebServerFactory factory) {
        factory.setPort(port);
    }

    public String getEnv() {
        return env;
    }

    public void setEnv(String env) {
        this.env = env;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }
}
