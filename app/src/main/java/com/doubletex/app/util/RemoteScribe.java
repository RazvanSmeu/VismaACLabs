package com.doubletex.app.util;

public interface RemoteScribe<T, Op> {
    PageResponse<T> dataBookQuery(PageRequest<Op> request);
}
