package com.doubletex.app.util;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Filter<Op> {
    private String tag;
    private Op operation;
    private String[] parameters;
}
