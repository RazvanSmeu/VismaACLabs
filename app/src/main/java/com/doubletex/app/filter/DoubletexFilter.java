//package com.doubletex.app.filter;
//
//import lombok.extern.slf4j.Slf4j;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.GenericFilterBean;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
///**
// * @author Alexandru Enache
// * @date 15.02.2022
// */
//
//@Component
//public class DoubletexFilter extends GenericFilterBean {
//
//    private final static Logger LOG = LoggerFactory.getLogger(DoubletexFilter.class);
//
//    @Override
//    public void doFilter(ServletRequest servletRequest,
//                         ServletResponse servletResponse,
//                         FilterChain filterChain) throws IOException, ServletException {
//        HttpServletRequest req = (HttpServletRequest) servletRequest;
//        HttpServletResponse res = (HttpServletResponse) servletResponse;
//        LOG.info("Logging Request {} : {}", req.getMethod(), req.getRequestURI());
//        filterChain.doFilter(servletRequest, servletResponse);
//        LOG.info("Logging Response with status: {}", res.getStatus());
//
//    }
//}
