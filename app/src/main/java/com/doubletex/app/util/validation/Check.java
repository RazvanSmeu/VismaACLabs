package com.doubletex.app.util.validation;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.function.BooleanSupplier;

@Getter
@Setter
@AllArgsConstructor
public class Check {
    private String fieldName;
    private String message;
    private boolean isOk;

    public static Check that(
        boolean isOk,
        String fieldName,
        String message
    ) {
        return new Check(fieldName, message, isOk);
    }

}