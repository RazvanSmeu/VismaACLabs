package com.doubletex.app.util.validation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.*;
import java.util.stream.Stream;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@JsonIgnoreProperties({"suppressed", "cause", "stackTrace", "localizedMessage"})
public class Validation extends RuntimeException {
    private int httpCode = 400;
    private String message;
    private List<Field> fields = new LinkedList<>();

    public Validation(String message, Field ...fields) {
        super(message);
        this.message = message;
        this.fields = new ArrayList<>(Arrays.asList(fields));
    }

    public boolean getInvalid() {
        return fields != null && !fields.isEmpty() || message != null && !message.isEmpty();
    }

    public Validation checking(Check... checks) {
        for(Check check : checks) {
            if(!check.isOk()) {
                getFields().add(new Field(check.getFieldName(), check.getMessage()));
            }
        }
        return this;
    }

    public static Validation checkAll(Check... checks) {
        return new Validation().checking(checks);
    }

    public Validation checkAll(List<Check> checks) {
        return checkAll(checks.toArray(Check[]::new));
    }

    public Validation and(Validation another) {
        return new Validation(
            this.message,
            Stream.of(
                this.getFields(),
                another.getFields()
            )
                .flatMap(Collection::stream)
                .toArray(Field[]::new)
        );
    }

    public void throwIfNecessary() {
        if(getInvalid()) {
            if(getMessage() == null || getMessage().isEmpty()) {
                setMessage("There are field validation errors.");
            }
            throw this;
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Field {
        private String name;
        private String message;
    }
}