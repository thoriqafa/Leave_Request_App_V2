package id.co.mii.clientapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(requests -> requests
                        .antMatchers("/css/**", "/js/**", "/img/**").permitAll()
                        .antMatchers("/login").permitAll()
                        // .anyRequest().authenticated()
                        .anyRequest().permitAll()
                )
                
                .formLogin(login -> login
                    .loginPage("/login")
                    .loginProcessingUrl("/login")
                    // .successForwardUrl("/dashboard")
                    .failureForwardUrl("/login?error=true").permitAll()
                )
                
                .logout(logout -> logout
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    // .logoutUrl("/logout")
                    .permitAll()
                );
    }
}
