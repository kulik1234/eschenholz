package pl.eschenholz.api.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import pl.eschenholz.api.filters.JwtFilter;

@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().and().authorizeRequests()
                .antMatchers("/test2").hasRole("USER")
                .antMatchers("/test3").hasRole("ADMIN")
                .antMatchers("/api/customer/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST,"/api/login*").permitAll()
                .antMatchers(HttpMethod.GET,"/api/login*").permitAll()
                .anyRequest().authenticated()
                .and().formLogin()
                .and()
                .addFilter(new JwtFilter(authenticationManager()));
    }
}
