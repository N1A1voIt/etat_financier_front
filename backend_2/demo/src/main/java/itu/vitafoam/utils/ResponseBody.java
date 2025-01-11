package itu.vitafoam.utils;

import java.util.List;

public class ResponseBody {
    int statusCode;
    Object data;
    Exception[] exceptions;

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Exception[] getExceptions() {
        return exceptions;
    }

    public void setExceptions(Exception[] exceptions) {
        this.exceptions = exceptions;
    }
}
