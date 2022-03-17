package com.doubletex.app.util;

import com.doubletex.app.api.BaseEntity;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.hibernate.proxy.HibernateProxy;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class  IdProxySerializer<T extends BaseEntity> extends StdSerializer<T> {
    public IdProxySerializer() {
        this(null);
    }

    public IdProxySerializer(Class<T> t) {
        super(t);
    }

    @Override
    public void serialize(T t, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        serializeHelper(t, jsonGenerator, serializerProvider);
    }

    private static <T extends BaseEntity> void serializeHelper(T t, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        if(t instanceof HibernateProxy) {
            HibernateProxy proxy = (HibernateProxy) t;
            if(proxy.getHibernateLazyInitializer().isUninitialized()) {
                jsonGenerator.writeStartObject();
                jsonGenerator.writeNumberField("id", t.getId());
                jsonGenerator.writeBooleanField("isInitialized", false);
                jsonGenerator.writeEndObject();
            } else {
                jsonGenerator.writeObject(t);
            }
        } else {
            jsonGenerator.writeObject(t);
        }
    }

    public static class ForLists<T extends BaseEntity> extends StdSerializer<List<T>> {
        public ForLists() {
            this(null);
        }

        protected ForLists(Class<List<T>> t) {
            super(t);
        }

        @Override
        public void serialize(List<T> ts, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            jsonGenerator.writeStartArray();
            for(T t : ts) {
                serializeHelper(t, jsonGenerator, serializerProvider);
            }
            jsonGenerator.writeEndArray();
        }
    }
}
