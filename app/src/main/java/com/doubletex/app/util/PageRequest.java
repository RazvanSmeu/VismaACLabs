package com.doubletex.app.util;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PageRequest<Op> {
    private int pageNumber;
    private int pageSize;
    private Filter<Op>[] filters;
}
