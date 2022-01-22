package weblab4.sequrity;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import weblab4.services.OwnerDetails;

import static weblab4.sequrity.SecurityConstants.SIGN_UP_URL;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

    private final OwnerDetails ownerDetails;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurity(OwnerDetails ownerDetails, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.ownerDetails = ownerDetails;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(SIGN_UP_URL).permitAll()
                .anyRequest().authenticated()

                .and()
                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
                // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);


//                .and.cors()
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(ownerDetails).passwordEncoder(bCryptPasswordEncoder);
    }

//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//
//        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
//        source.registerCorsConfiguration("/**", corsConfiguration);
//
//        return source;
//    }
}
