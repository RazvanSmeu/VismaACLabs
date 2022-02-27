package com.doubletex.app.util;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PageResponse<T> {
    private List<T> page;
    private int pageLimit;
}
