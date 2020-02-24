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
                .mvcMatchers("/test2").hasAnyRole("USER","ADMIN")
                .mvcMatchers("/test3").hasRole("ADMIN")
                .mvcMatchers("/api/customer/**").hasRole("ADMIN")
                .mvcMatchers(HttpMethod.POST,"/api/login*").permitAll()
                .mvcMatchers(HttpMethod.GET,"/api/login*").permitAll()
                .and().formLogin()
                .and()
                .csrf().disable()
                .addFilter(new JwtFilter(authenticationManager()));
    }
}
