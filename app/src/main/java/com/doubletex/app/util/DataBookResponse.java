package com.doubletex.app.util;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DataBookResponse<T> {
    private T[] page;
    private int pageLimit;
}
