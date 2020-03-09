package pl.eschenholz.api.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import pl.eschenholz.api.enums.UserRole;
import pl.eschenholz.api.filters.JwtFilter;

@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        String admin_role = UserRole.ROLE_ADMIN.getRole();
        String user_role = UserRole.ROLE_USER.getRole();
        Logger l = LoggerFactory.getLogger(WebSecurityConfiguration.class);
        l.info("admin role: " + admin_role+"; user role: " + user_role);
        http.httpBasic().and().authorizeRequests()
                .mvcMatchers("/test2").hasAnyRole(user_role,admin_role)
                .mvcMatchers("/test3").hasRole(admin_role)
                .mvcMatchers(HttpMethod.POST,"/api/login*").permitAll()
                .mvcMatchers(HttpMethod.GET,"/api/login*").permitAll()
                .mvcMatchers(HttpMethod.GET,"/api/photo/**").permitAll()
                .mvcMatchers(HttpMethod.POST,"/api/photo/**").hasRole(admin_role)
                .mvcMatchers(HttpMethod.PUT,"/api/photo/**").hasRole(admin_role)
                .mvcMatchers(HttpMethod.DELETE,"/api/photo/**").hasRole(admin_role)
                .mvcMatchers(HttpMethod.GET,"/api/customer/**").hasRole(admin_role)
                .mvcMatchers(HttpMethod.POST,"/api/customer/**").hasRole(admin_role)
                .mvcMatchers(HttpMethod.DELETE,"/api/customer/**").hasRole(admin_role)
                .mvcMatchers(HttpMethod.PUT,"/api/customer/**").hasRole(admin_role)
                .and().formLogin()
                .and()
                .csrf().disable()
                .addFilter(new JwtFilter(authenticationManager()));
    }
}
