package com.doubletex.app.util;

import com.doubletex.app.exceptions.DoubletexBadRequest;

import java.util.*;

/**
 * @author Alexandru Enache
 * @date 07.03.2022
 */

public class Validations {

    private static final Map<String, Set<String>> validationMessages = new TreeMap<>();

    private Validations() {

    }

    public static void addToValidationsList(String key, String reason) {
        Set<String> validations;
        if (!validationMessages.containsKey(key)) {
            validations = new TreeSet<>();
        } else {
            validations = validationMessages.get(key);
        }
        validations.add(reason);
        validationMessages.put(key, validations);
    }

    public static void throwValidationException() throws DoubletexBadRequest {
        if (validationMessages.isEmpty())
            return;
        throw new DoubletexBadRequest();
    }

    public static Map<String, Set<String>> getValidationMessages() {
        return validationMessages;
    }
}
