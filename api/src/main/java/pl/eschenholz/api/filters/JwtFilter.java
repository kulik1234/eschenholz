package pl.eschenholz.api.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.thymeleaf.IThrottledTemplateProcessor;
import pl.eschenholz.api.exception.UserNotLoggedInException;
import pl.eschenholz.api.exception.WrongTokenException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.Null;
import java.io.IOException;
import java.util.*;


public class JwtFilter extends BasicAuthenticationFilter {
    public JwtFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader("Authorization");
        UsernamePasswordAuthenticationToken authResult = getAuthenticationByToken(header);
        //if(authResult == null) throw new UserNotLoggedInException();
        SecurityContextHolder.getContext().setAuthentication(authResult);
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthenticationByToken(String header) throws UserNotLoggedInException, WrongTokenException {

        try {
            DecodedJWT token;
            Algorithm algorithm = Algorithm.HMAC512("algo");
            JWTVerifier verifier = JWT.require(algorithm).withIssuer("auth0").build();
            token = verifier.verify(header.substring(7));
                Map<String, Claim> claims = token.getClaims();
                Set<SimpleGrantedAuthority> simpleGrantedAuthorities = Collections.singleton(new SimpleGrantedAuthority(claims.get("role").asString()));
                return new UsernamePasswordAuthenticationToken(claims.get("login"),null,simpleGrantedAuthorities);

        }
        catch (JWTVerificationException | NullPointerException e){
          //  if(e instanceof NullPointerException) throw new UserNotLoggedInException();
           // if(e instanceof JWTVerificationException) throw new WrongTokenException(e.getMessage());
            LoggerFactory.getLogger(JwtFilter.class).info("blad w filtrze: " + e.getMessage());
        }
        return null;// new UsernamePasswordAuthenticationToken("Anonymus",null, Collections.singleton(new SimpleGrantedAuthority("ROLE_ANONYMUS")));
    }
}
