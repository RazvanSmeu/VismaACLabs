package com.doubletex.app.util;

public interface RemoteScribe<T, Op> {
    DataBookResponse<T> dataBookQuery(DataBookRequest<Op> request);
}
